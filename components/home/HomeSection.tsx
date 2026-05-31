import SectionHeader from "@/components/common/SectionHeader";

interface HomeSectionProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
  className?: string;
}

export default function HomeSection({
  title,
  subtitle,
  actionLabel,
  actionHref,
  children,
  className = "",
}: HomeSectionProps) {
  return (
    <section className={`container-page py-10 ${className}`}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actionLabel={actionLabel}
        actionHref={actionHref}
        className="mb-6"
      />
      {children}
    </section>
  );
}
