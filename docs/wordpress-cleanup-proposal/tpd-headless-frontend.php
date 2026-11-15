<?php
/**
 * Plugin Name: True Path Headless Frontend
 * Description: Routes verified published posts to Next.js; retires the CMS frontend.
 * Version: 0.1.0-draft
 *
 * REVIEW COPY ONLY. Not installed or activated on WordPress.
 * Proposed location: wp-content/mu-plugins/tpd-headless-frontend.php
 */

defined( 'ABSPATH' ) || exit;

function tpd_headless_is_backend() {
    return 'admin.truepath406.com' === strtolower( (string) wp_parse_url( home_url( '/' ), PHP_URL_HOST ) );
}

function tpd_headless_skip_frontend() {
    $method = strtoupper( $_SERVER['REQUEST_METHOD'] ?? 'GET' );
    $path = (string) wp_parse_url( wp_unslash( $_SERVER['REQUEST_URI'] ?? '/' ), PHP_URL_PATH );

    return ! tpd_headless_is_backend()
        || ! in_array( $method, array( 'GET', 'HEAD' ), true )
        || is_admin() || wp_doing_ajax() || wp_doing_cron()
        || ( defined( 'REST_REQUEST' ) && REST_REQUEST )
        || ( defined( 'GRAPHQL_REQUEST' ) && GRAPHQL_REQUEST )
        || isset( $_GET['rest_route'] ) || isset( $_GET['graphql'] )
        || is_preview() || is_customize_preview()
        || preg_match( '~^/(?:wp-admin(?:/|$)|wp-login\.php(?:/|$)|wp-json(?:/|$)|graphql(?:/|$)|xmlrpc\.php(?:/|$)|wp-cron\.php(?:/|$)|wp-content(?:/|$)|wp-includes(?:/|$)|robots\.txt$)~i', $path );
}

function tpd_headless_public_url( $path ) {
    // Keep attribution; omit CMS routing parameters and preview/authentication data.
    $tracking = array();
    foreach ( array( 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid' ) as $key ) {
        if ( isset( $_GET[ $key ] ) && is_string( $_GET[ $key ] ) ) {
            $tracking[ $key ] = wp_unslash( $_GET[ $key ] );
        }
    }

    return add_query_arg( $tracking, 'https://truepath406.com' . $path );
}

function tpd_headless_route_frontend() {
    if ( tpd_headless_skip_frontend() ) {
        return;
    }

    // Disable WordPress's fuzzy 404-to-similar-slug redirect for retired routes.
    remove_action( 'template_redirect', 'redirect_canonical' );
    $destination = null;

    if ( is_front_page() && ! is_search() && ! is_feed() && ! is_404() ) {
        $destination = tpd_headless_public_url( '/' );
    } elseif ( is_singular( 'post' ) ) {
        $post = get_queried_object();
        if ( $post instanceof WP_Post && 'publish' === $post->post_status && empty( $post->post_password ) && ! empty( $post->post_name ) ) {
            $slug = rawurlencode( rawurldecode( $post->post_name ) );
            $destination = tpd_headless_public_url( '/insights/' . $slug );
        }
    }

    if ( null !== $destination ) {
        // Destination host is fixed above, never derived from request input.
        if ( wp_redirect( $destination, 301, 'True Path Headless Frontend' ) ) {
            exit;
        }
        return;
    }

    global $wp_query;
    $wp_query->set_404();
    // set_404() intentionally preserves is_feed; retire feeds as HTML 404s too.
    $wp_query->is_feed = false;
    $GLOBALS['tpd_headless_frontend_404'] = true;
    status_header( 404 );
    nocache_headers();
}
add_action( 'template_redirect', 'tpd_headless_route_frontend', 1 );

add_filter( 'template_include', function ( $template ) {
    $minimal_template = __DIR__ . '/tpd-headless/404.php';
    return ! empty( $GLOBALS['tpd_headless_frontend_404'] ) && is_file( $minimal_template )
        ? $minimal_template
        : $template;
}, 99 );

// Yoast XML sitemaps are disabled separately in its inspected settings screen.
// Prevent WordPress core's sitemap from replacing the retired Yoast sitemap.
add_filter( 'wp_sitemaps_enabled', function ( $enabled ) {
    return tpd_headless_is_backend() ? false : $enabled;
} );

add_filter( 'robots_txt', function ( $output ) {
    if ( ! tpd_headless_is_backend() ) {
        return $output;
    }
    // Permit crawlers to see the existing HTTP noindex; advertise no CMS sitemap.
    return "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n";
}, PHP_INT_MAX );
