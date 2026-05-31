"use client";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function FilterBar({
  options,
  active,
  onChange,
  className = "",
}: FilterBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtre"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {options.map((opt) => {
        const isActive = opt.id === active;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={`focus-ring inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-ink hover:bg-bg"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
