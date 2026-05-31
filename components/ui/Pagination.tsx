"use client";

interface PaginationProps {
  current: number;
  total: number;
  onChange?: (page: number) => void;
}

export default function Pagination({
  current,
  total,
  onChange,
}: PaginationProps) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Sayfalama">
      <button
        type="button"
        disabled={current === 1}
        onClick={() => onChange?.(current - 1)}
        aria-label="Önceki"
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink disabled:opacity-40 hover:bg-bg"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange?.(p)}
          aria-current={p === current ? "page" : undefined}
          className={`focus-ring inline-flex h-11 min-w-[44px] items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors ${
            p === current
              ? "border-accent bg-accent text-white"
              : "border-line bg-white text-ink hover:bg-bg"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={current === total}
        onClick={() => onChange?.(current + 1)}
        aria-label="Sonraki"
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink disabled:opacity-40 hover:bg-bg"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
