import { vaccineOptions } from '../data/vaccines';

interface HeroProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function Hero({ selected, onSelect }: HeroProps) {
  return (
    <section id="hero" className="hero">
      <p className="hero-label" data-animate>Vaccine Transparency Project</p>
      <h1 className="hero-title" data-animate>
        Vax<span>Plain</span>
      </h1>
      <p className="hero-tagline" data-animate>
        Informed consent starts with honest information. Explore vaccine
        ingredients, efficacy data, disease history, and both sides of the
        debate — with full source transparency.
      </p>
      <div className="hero-selector" data-animate>
        <span className="hero-selector-label">Select a vaccine</span>
        <div className="hero-pills">
          {vaccineOptions.map((opt) => (
            <button
              key={opt.value}
              className={`hero-pill${selected === opt.value ? ' hero-pill--active' : ''}`}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-scroll-hint">
        <div className="hero-scroll-hint-chevron" />
      </div>
    </section>
  );
}
