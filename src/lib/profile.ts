import { promises as fs } from "fs";
import path from "path";

export type Link = {
  id: string;
  label: string;
  url: string;
  clicks: number;
};

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
};

// 지금은 로컬 JSON 파일에 저장합니다. MongoDB Atlas 연결 시 이 파일만 교체하면 됩니다.
const DATA_FILE = path.join(process.cwd(), "data", "profile.json");

export async function getProfile(): Promise<Profile> {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as Profile;
}

export async function incrementClicks(linkId: string): Promise<Link | null> {
  const profile = await getProfile();
  const link = profile.links.find((item) => item.id === linkId);

  if (!link) return null;

  link.clicks += 1;
  await fs.writeFile(DATA_FILE, JSON.stringify(profile, null, 2), "utf8");
  return link;
}
