import { connection } from "next/server";
import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { getProfile } from "@/lib/profile";

export default async function Home() {
  // 프로필 데이터가 바뀔 수 있으므로 빌드 시점이 아닌 요청 시점에 읽음
  await connection();
  const profile = await getProfile();

  return (
    <main className="flex flex-1 justify-center px-6 py-16 sm:py-24">
      <div className="w-full max-w-md">
        <ProfileHeader
          name={profile.name}
          bio={profile.bio}
          avatar={profile.avatar}
        />

        <nav aria-label="링크 목록" className="mt-10 flex flex-col gap-4">
          {profile.links.map((link) => (
            <LinkCard key={link.id} id={link.id} label={link.label} url={link.url} />
          ))}
        </nav>
      </div>
    </main>
  );
}
