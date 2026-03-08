import type { ReactNode } from 'react';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

interface SectionProps {
  id: string;
  accent?: string;
  children: ReactNode;
}

export default function Section({ id, accent = '#2962FF', children }: SectionProps) {
  const containerRef = useGSAPScrollReveal();

  return (
    <section
      id={id}
      ref={containerRef as React.RefObject<HTMLElement>}
      className="section"
      style={{ '--section-accent': accent } as React.CSSProperties}
    >
      <div className="section-inner">{children}</div>
    </section>
  );
}
