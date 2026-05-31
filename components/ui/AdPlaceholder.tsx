interface AdPlaceholderProps {
  label?: string;
  /** Tailwind aspect-ratio sınıfı; layout shift'i önlemek için sabit oran */
  ratio?: "banner" | "box" | "wide";
  className?: string;
}

const RATIO_CLASS: Record<NonNullable<AdPlaceholderProps["ratio"]>, string> = {
  banner: "aspect-[8/1] min-h-[90px]",
  box: "aspect-[4/3] min-h-[200px]",
  wide: "aspect-[6/1] min-h-[100px]",
};

export default function AdPlaceholder({
  label = "Reklam Alanı",
  ratio = "wide",
  className = "",
}: AdPlaceholderProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-2xl border border-dashed border-line bg-white/60 ${RATIO_CLASS[ratio]} ${className}`}
      role="complementary"
      aria-label={label}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}
