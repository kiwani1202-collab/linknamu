type Props = {
  label: string;
  url: string;
  clicks: number;
  onClick: () => void;
};

export default function LinkCard({ label, url, clicks, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block rounded-3xl border border-white/70 bg-white/45 px-16 py-[1.125rem] text-center text-[15px] font-semibold text-stone-800 shadow-[0_8px_24px_-12px_rgb(160_90_40/0.25)] backdrop-blur-xl transition duration-200 hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_12px_28px_-12px_rgb(160_90_40/0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {label}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-stone-500">
        {clicks.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
