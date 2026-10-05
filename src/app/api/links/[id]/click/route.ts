import type { NextRequest } from "next/server";
import { incrementClicks } from "@/lib/profile";

export async function POST(
  _req: NextRequest,
  ctx: RouteContext<"/api/links/[id]/click">
) {
  const { id } = await ctx.params;
  const link = await incrementClicks(id);

  if (!link) {
    return Response.json({ error: "Link not found" }, { status: 404 });
  }

  return Response.json({ id: link.id, clicks: link.clicks });
}
