import { NextRequest } from "next/server";
import { GET as handlerWithFilename } from "./[filename]/route";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") || "Document.pdf";
  return handlerWithFilename(request, { params: Promise.resolve({ filename: title }) });
}
