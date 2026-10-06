import { getDb } from "@/lib/mongodb";

// clicks 컬렉션: 링크 하나당 문서 하나 { _id: 링크 id, count: 클릭 수 }
type ClickDoc = { _id: string; count: number };

async function getCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

export async function getClickCounts(
  linkIds: string[]
): Promise<Record<string, number>> {
  const collection = await getCollection();
  const docs = await collection.find({ _id: { $in: linkIds } }).toArray();

  // 아직 한 번도 클릭되지 않은 링크는 문서가 없으므로 0으로 채움
  const counts = Object.fromEntries(linkIds.map((id) => [id, 0]));
  for (const doc of docs) counts[doc._id] = doc.count;
  return counts;
}

export async function incrementClick(linkId: string): Promise<number> {
  const collection = await getCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: linkId },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  return doc?.count ?? 1;
}
