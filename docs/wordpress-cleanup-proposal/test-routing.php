<?php
// Local decision tests with WordPress stubs; never upload this file to WordPress.
define( 'ABSPATH', __DIR__ );
$actions = array();
$filters = array();
function add_action( $hook, $callback, $priority = 10 ) { $GLOBALS['actions'][ $hook ][] = $callback; }
function add_filter( $hook, $callback, $priority = 10 ) { $GLOBALS['filters'][ $hook ][] = $callback; }
function remove_action( $hook, $callback ) { $GLOBALS['events']['canonical_removed'] = true; }
function wp_parse_url( $url, $component = -1 ) { return parse_url( $url, $component ); }
function wp_unslash( $value ) { return stripslashes( $value ); }
function home_url( $path ) { return ( $GLOBALS['case']['origin'] ?? 'https://admin.truepath406.com' ) . $path; }
function is_admin() { return $GLOBALS['case']['admin'] ?? false; }
function wp_doing_ajax() { return $GLOBALS['case']['ajax'] ?? false; }
function wp_doing_cron() { return $GLOBALS['case']['cron'] ?? false; }
function is_preview() { return $GLOBALS['case']['preview'] ?? false; }
function is_customize_preview() { return $GLOBALS['case']['customizer'] ?? false; }
function is_front_page() { return $GLOBALS['case']['front'] ?? false; }
function is_search() { return $GLOBALS['case']['search'] ?? false; }
function is_feed() { return $GLOBALS['wp_query']->is_feed; }
function is_404() { return $GLOBALS['case']['not_found'] ?? false; }
function is_singular( $type ) { return ( $GLOBALS['case']['post_type'] ?? null ) === $type; }
function add_query_arg( $query, $url ) { return $url . ( $query ? '?' . http_build_query( $query ) : '' ); }
function wp_redirect( $url, $status, $by ) {
    $GLOBALS['events']['redirect'] = array( 'url' => $url, 'status' => $status );
    return false; // Capture the decision without terminating this local test runner.
}
function status_header( $status ) { $GLOBALS['events']['status'] = $status; }
function nocache_headers() { $GLOBALS['events']['no_cache'] = true; }
class WP_Post {
    public $post_name;
    public $post_status;
    public $post_password;
    function __construct( $case ) {
        $this->post_name = $case['slug'] ?? 'service-business-website';
        $this->post_status = $case['post_status'] ?? 'publish';
        $this->post_password = $case['password'] ?? '';
    }
}
class MockQuery {
    public $is_feed = false;
    function set_404() { $GLOBALS['events']['set_404'] = true; }
}
function get_queried_object() { return new WP_Post( $GLOBALS['case'] ); }
require __DIR__ . '/tpd-headless-frontend.php';

$cases = array(
    'published article' => array( 'uri' => '/service-business-website/', 'post_type' => 'post', 'redirect' => 'https://truepath406.com/insights/service-business-website' ),
    'future newly published slug needs no map edit' => array( 'uri' => '/new-useful-article/', 'post_type' => 'post', 'slug' => 'new-useful-article', 'redirect' => 'https://truepath406.com/insights/new-useful-article' ),
    'tracking retained and CMS parameters removed' => array( 'uri' => '/?p=123&utm_source=newsletter&token=do-not-forward', 'post_type' => 'post', 'redirect' => 'https://truepath406.com/insights/service-business-website?utm_source=newsletter' ),
    'homepage' => array( 'uri' => '/', 'front' => true, 'redirect' => 'https://truepath406.com/' ),
    'date archive' => array( 'uri' => '/2026/03/', 'status' => 404 ),
    'category archive' => array( 'uri' => '/category/foundational/', 'status' => 404 ),
    'feed' => array( 'uri' => '/feed/', 'feed' => true, 'status' => 404 ),
    'search' => array( 'uri' => '/?s=marketing', 'front' => true, 'search' => true, 'status' => 404 ),
    'unknown slug' => array( 'uri' => '/missing/', 'not_found' => true, 'status' => 404 ),
    'draft is not a public replacement' => array( 'uri' => '/draft/', 'post_type' => 'post', 'post_status' => 'draft', 'status' => 404 ),
    'password-protected is not a public replacement' => array( 'uri' => '/protected/', 'post_type' => 'post', 'password' => 'test-only', 'status' => 404 ),
    'admin login' => array( 'uri' => '/wp-login.php', 'skip' => true ),
    'admin dashboard' => array( 'uri' => '/wp-admin/', 'admin' => true, 'skip' => true ),
    'GraphQL POST' => array( 'uri' => '/graphql', 'method' => 'POST', 'skip' => true ),
    'GraphQL GET' => array( 'uri' => '/graphql?query=test', 'skip' => true ),
    'REST pretty endpoint' => array( 'uri' => '/wp-json/wp/v2/posts', 'skip' => true ),
    'REST query endpoint' => array( 'uri' => '/?rest_route=/wp/v2/posts', 'front' => true, 'skip' => true ),
    'media' => array( 'uri' => '/wp-content/uploads/photo.webp', 'skip' => true ),
    'scripts' => array( 'uri' => '/wp-includes/js/example.js', 'skip' => true ),
    'cron' => array( 'uri' => '/wp-cron.php', 'skip' => true ),
    'preview' => array( 'uri' => '/?preview=true&p=12', 'preview' => true, 'skip' => true ),
    'customizer' => array( 'uri' => '/', 'customizer' => true, 'skip' => true ),
    'robots' => array( 'uri' => '/robots.txt', 'skip' => true ),
    'POST form data' => array( 'uri' => '/anything/', 'method' => 'POST', 'skip' => true ),
    'another site' => array( 'uri' => '/', 'origin' => 'https://another.example', 'skip' => true ),
);

foreach ( $cases as $name => $case ) {
    $GLOBALS['case'] = $case;
    $GLOBALS['events'] = array();
    $GLOBALS['tpd_headless_frontend_404'] = false;
    $GLOBALS['wp_query'] = new MockQuery();
    $GLOBALS['wp_query']->is_feed = $case['feed'] ?? false;
    $_SERVER['REQUEST_METHOD'] = $case['method'] ?? 'GET';
    $_SERVER['REQUEST_URI'] = $case['uri'];
    parse_str( (string) parse_url( $case['uri'], PHP_URL_QUERY ), $_GET );
    tpd_headless_route_frontend();
    $events = $GLOBALS['events'];
    $ok = ! empty( $case['skip'] ) ? empty( $events )
        : ( isset( $case['redirect'] )
            ? ( ( $events['redirect']['url'] ?? null ) === $case['redirect'] && $events['redirect']['status'] === 301 )
            : ( ( $events['status'] ?? null ) === 404 && ! empty( $events['set_404'] ) && ! empty( $events['no_cache'] ) && ! $GLOBALS['wp_query']->is_feed ) );
    if ( ! $ok ) { fwrite( STDERR, "FAIL $name " . json_encode( $events ) . "\n" ); exit( 1 ); }
    if ( isset( $case['status'] ) ) {
        $template = $filters['template_include'][0]( '/theme/404.php' );
        if ( $template !== __DIR__ . '/tpd-headless/404.php' ) { exit( 1 ); }
    }
    echo "PASS $name\n";
}
$GLOBALS['case'] = array();
if ( false !== $filters['wp_sitemaps_enabled'][0]( true ) ) { exit( 1 ); }
$robots = $filters['robots_txt'][0]( 'Sitemap: https://admin.truepath406.com/sitemap_index.xml' );
if ( str_contains( $robots, 'Sitemap:' ) || str_contains( $robots, "Disallow: /\n" ) ) { exit( 1 ); }
echo "PASS core sitemap disabled and crawlable robots contains no CMS sitemap\n";
echo count( $cases ) + 1, " mocked checks passed; no live WordPress code executed.\n";
