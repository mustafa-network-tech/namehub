import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted sm:text-base">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="focus-ring shrink-0 whitespace-nowrap text-sm font-medium text-accent hover:text-accent-hover"
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
