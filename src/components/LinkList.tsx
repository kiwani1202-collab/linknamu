"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/lib/profile";

export default function LinkList({ links }: { links: Link[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옴
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, number>) => setCounts(data))
      .catch(() => {
        // 실패하면 0회 표시를 그대로 유지
      });
  }, []);

  function handleClick(id: string) {
    // 화면은 바로 +1, 서버 응답이 오면 실제 값으로 맞춤
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // keepalive: 새 탭으로 이동하는 중에도 요청이 끊기지 않음
    fetch(`/api/links/${encodeURIComponent(id)}/click`, {
      method: "POST",
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { clicks: number } | null) => {
        if (data) setCounts((prev) => ({ ...prev, [id]: data.clicks }));
      })
      .catch(() => {});
  }

  return (
    <nav aria-label="링크 목록" className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          label={link.label}
          url={link.url}
          clicks={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
