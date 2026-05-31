interface RelatedNamesProps {
  title: string;
  names: string[];
  variant?: "chip" | "pill";
}

export default function RelatedNames({
  title,
  names,
  variant = "chip",
}: RelatedNamesProps) {
  if (names.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {names.map((name) => (
          <span
            key={name}
            className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium ${
              variant === "pill"
                ? "border-accent/20 bg-accent/5 text-accent"
                : "border-line bg-white text-ink"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
