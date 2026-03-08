import { vaccineOptions } from '../data/vaccines';

interface HeroProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function Hero({ selected, onSelect }: HeroProps) {
  return (
    <section id="hero" className="hero">
      <p className="hero-label">Vaccine Transparency Project</p>
      <h1 className="hero-title">
        Vax<span>Plain</span>
      </h1>
      <p className="hero-tagline">
        Informed consent starts with honest information. Explore vaccine
        ingredients, efficacy data, disease history, and both sides of the
        debate — with full source transparency.
      </p>
      <div className="hero-selector">
        <label htmlFor="vaccine-select">Select a vaccine</label>
        <select
          id="vaccine-select"
          className="hero-select"
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
        >
          {vaccineOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="hero-scroll-hint">Scroll to explore</div>
    </section>
  );
}
