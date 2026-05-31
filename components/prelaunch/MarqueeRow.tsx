interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
  dark?: boolean;
}

export default function MarqueeRow({
  items,
  direction = "left",
  dark = false,
}: MarqueeRowProps) {
  const loop = [...items, ...items];
  const animClass = direction === "left" ? "marquee-left" : "marquee-right";

  const chipClass = dark
    ? "border-white/15 bg-white/[0.06] text-slate-200 backdrop-blur"
    : "border-line bg-white/80 text-ink shadow-soft backdrop-blur";

  return (
    <div className="group relative overflow-hidden py-2">
      {/* Kenar yumuşatma maskeleri (yalnızca açık temada) */}
      {!dark && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-24" />
        </>
      )}

      <div className={`flex w-max items-center gap-3 ${animClass} group-hover:[animation-play-state:paused]`}>
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-sm font-medium ${chipClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
