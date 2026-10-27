import { permanentRedirect } from "next/navigation";

export function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
  permanentRedirect(`/tools/marketing-checkup/email-preview${new URL(request.url).search}`);
}
