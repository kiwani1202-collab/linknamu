import Image from "next/image";
import type { Profile } from "@/lib/profile";

type Props = Pick<Profile, "name" | "bio" | "avatar">;

export default function ProfileHeader({ name, bio, avatar }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={avatar}
        alt={`${name} 프로필 사진`}
        width={112}
        height={112}
        priority
        className="size-28 rounded-full object-cover ring-4 ring-white shadow-lg shadow-emerald-900/10"
      />
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
        {name}
      </h1>
      <p className="mt-1.5 text-[15px] text-slate-500">{bio}</p>
    </header>
  );
}
