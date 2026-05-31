interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <main className={`container-page py-8 sm:py-10 ${className}`}>
      {children}
    </main>
  );
}
