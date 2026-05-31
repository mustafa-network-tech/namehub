interface EmptyStateProps {
  title: string;
  description?: string;
  emoji?: string;
}

export default function EmptyState({
  title,
  description,
  emoji = "🔍",
}: EmptyStateProps) {
  return (
    <div className="card-base flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-3 text-4xl" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      )}
    </div>
  );
}
