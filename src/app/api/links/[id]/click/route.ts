import type { NextRequest } from "next/server";
import { incrementClick } from "@/lib/clicks";
import { getLinkIds } from "@/lib/profile";

export async function POST(
  _req: NextRequest,
  ctx: RouteContext<"/api/links/[id]/click">
) {
  const { id } = await ctx.params;

  // profile.json에 없는 id로 DB에 아무 문서나 생기지 않도록 막음
  const linkIds = await getLinkIds();
  if (!linkIds.includes(id)) {
    return Response.json({ error: "Link not found" }, { status: 404 });
  }

  const clicks = await incrementClick(id);
  return Response.json({ id, clicks });
}
