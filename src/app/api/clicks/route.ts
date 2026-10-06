import { getClickCounts } from "@/lib/clicks";
import { getLinkIds } from "@/lib/profile";

// 모든 링크의 클릭 수를 한 번에 반환: { "github": 42, "blog": 3, ... }
export async function GET() {
  const linkIds = await getLinkIds();
  const counts = await getClickCounts(linkIds);
  return Response.json(counts);
}
