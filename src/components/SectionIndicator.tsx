import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const SECTIONS = [
  { id: 'purpose', label: 'Purpose', accent: '#00E5FF' },
  { id: 'ingredients', label: 'Ingredients', accent: '#76FF03' },
  { id: 'data', label: 'Data', accent: '#FF6D00' },
  { id: 'threat', label: 'Threat', accent: '#FF1744' },
  { id: 'history', label: 'History', accent: '#D500F9' },
  { id: 'debate', label: 'Debate', accent: '#FFEA00' },
  { id: 'sources', label: 'Sources', accent: '#00E676' },
];

interface Props {
  active: string;
}

export default function SectionIndicator({ active }: Props) {
  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <nav className="section-indicator" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          className={`section-dot${active === s.id ? ' section-dot--active' : ''}`}
          style={
            active === s.id
              ? { background: s.accent, boxShadow: `0 0 12px ${s.accent}` }
              : undefined
          }
          onClick={() => scrollTo(s.id)}
          aria-label={`Scroll to ${s.label}`}
          title={s.label}
        />
      ))}
    </nav>
  );
}
