import { promises as fs } from "fs";
import path from "path";

export type Link = {
  id: string;
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
};

// 프로필과 링크 목록은 로컬 JSON 파일에서 읽고, 클릭 수는 MongoDB(lib/clicks.ts)에 저장합니다.
const DATA_FILE = path.join(process.cwd(), "data", "profile.json");

export async function getProfile(): Promise<Profile> {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as Profile;
}

export async function getLinkIds(): Promise<string[]> {
  const profile = await getProfile();
  return profile.links.map((link) => link.id);
}
