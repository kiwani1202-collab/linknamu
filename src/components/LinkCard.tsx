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
      className="block rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {label}
    </a>
  );
}
