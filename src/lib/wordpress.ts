import "server-only";

const DEFAULT_WORDPRESS_API_URL = "https://admin.truepath406.com";
const POSTS_PER_PAGE = 100;
const WORDPRESS_REQUEST_TIMEOUT_MS = 10_000;

interface GraphQLError {
  message: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

interface PostsPage {
  posts: {
    nodes: PostNode[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface AiOverviewsData {
  ai_quick_answer?: string | null;
  ai_faqs?: string | null;
  ai_takeaways?: string | null;
}

export interface PostNode {
  id: string;
  title: string;
  slug: string;
  date: string;
  modified?: string | null;
  excerpt: string;
  content?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    } | null;
  } | null;
  aiOverviews?: {
    ai_overviews?: AiOverviewsData | null;
  } | null;
}

function getWordPressGraphQLUrl(): string {
  const configuredUrl =
    process.env.WORDPRESS_API_URL?.trim() || DEFAULT_WORDPRESS_API_URL;
  const url = new URL(configuredUrl);
  const normalizedPath = url.pathname.replace(/\/+$/, "");

  url.pathname = normalizedPath.endsWith("/graphql")
    ? normalizedPath
    : `${normalizedPath}/graphql`;

  return url.toString();
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(getWordPressGraphQLUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(WORDPRESS_REQUEST_TIMEOUT_MS),
    next: {
      revalidate: 3600,
      tags: ["wordpress"],
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed with ${response.status} ${response.statusText}`,
    );
  }

  let result: GraphQLResponse<T>;

  try {
    result = (await response.json()) as GraphQLResponse<T>;
  } catch {
    throw new Error("WordPress GraphQL returned an invalid JSON response");
  }

  if (result.errors?.length) {
    const messages = result.errors.map(({ message }) => message).join("; ");
    throw new Error(`WordPress GraphQL error: ${messages}`);
  }

  if (result.data === undefined) {
    throw new Error("WordPress GraphQL response did not include data");
  }

  return result.data;
}

export async function getAllPosts(): Promise<PostNode[]> {
  const query = `
    query GetAllPosts($after: String) {
      posts(first: ${POSTS_PER_PAGE}, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          slug
          date
          modified
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

  const posts: PostNode[] = [];
  const seenCursors = new Set<string>();
  let after: string | null = null;

  do {
    const data: PostsPage = await fetchGraphQL<PostsPage>(query, { after });
    posts.push(...data.posts.nodes);

    if (!data.posts.pageInfo.hasNextPage) {
      break;
    }

    const nextCursor: string | null = data.posts.pageInfo.endCursor;
    if (!nextCursor || seenCursors.has(nextCursor)) {
      throw new Error("WordPress GraphQL returned an invalid pagination cursor");
    }

    seenCursors.add(nextCursor);
    after = nextCursor;
  } while (after);

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostNode | null> {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        modified
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        aiOverviews {
          ai_overviews {
            ai_quick_answer
            ai_faqs
            ai_takeaways
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ post: PostNode | null }>(query, { slug });
  return data.post ?? null;
}
