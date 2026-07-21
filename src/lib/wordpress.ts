const WP_GRAPHQL_URL = "https://admin.truepath406.com/graphql";

export interface PostNode {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

export async function fetchGraphQL<T>(
  query: string, 
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error("Failed to fetch GraphQL API");
  }
  return json.data;
}

export async function getAllPosts(): Promise<PostNode[]> {
  try {
    const query = `
      query GetAllPosts {
        posts(first: 50) {
          nodes {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `;
    const data = await fetchGraphQL<{ posts: { nodes: PostNode[] } }>(query);
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostNode | null> {
  try {
    const query = `
      query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          slug
          date
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    `;
    const data = await fetchGraphQL<{ post: PostNode | null }>(query, { slug });
    return data?.post || null;
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}
