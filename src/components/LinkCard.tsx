"use client";

import type { Link } from "@/lib/profile";

type Props = Pick<Link, "id" | "label" | "url">;

export default function LinkCard({ id, label, url }: Props) {
  function handleClick() {
    // sendBeacon은 새 탭으로 이동하는 중에도 요청이 끊기지 않음
    navigator.sendBeacon(`/api/links/${encodeURIComponent(id)}/click`);
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block rounded-3xl border border-white/70 bg-white/45 px-6 py-[1.125rem] text-center text-[15px] font-semibold text-stone-800 shadow-[0_8px_24px_-12px_rgb(160_90_40/0.25)] backdrop-blur-xl transition duration-200 hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_12px_28px_-12px_rgb(160_90_40/0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {label}
    </a>
  );
}
