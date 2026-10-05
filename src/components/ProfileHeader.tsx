import Image from "next/image";
import type { Profile } from "@/lib/profile";

type Props = Pick<Profile, "name" | "bio" | "avatar">;

export default function ProfileHeader({ name, bio, avatar }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 아래로 떨어지는 따뜻한 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-12px_rgb(194_100_40/0.45),0_4px_10px_-2px_rgb(120_60_20/0.12)] ring-1 ring-white/80">
        <Image
          src={avatar}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          priority
          className="size-24 rounded-full object-cover sm:size-28"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900">
        {name}
      </h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-600">
        {bio}
      </p>
    </header>
  );
}
