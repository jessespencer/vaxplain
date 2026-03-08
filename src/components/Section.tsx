import { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionProps {
  id: string;
  dark?: boolean;
  children: ReactNode;
}

export default function Section({ id, dark, children }: SectionProps) {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`section${dark ? ' section--dark' : ''}${visible ? ' visible' : ''}`}
    >
      <div className="section-inner">{children}</div>
    </section>
  );
}
