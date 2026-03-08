import { useEffect, useState } from 'react';

const sections = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'data', label: 'Data' },
  { id: 'threat', label: 'Threat' },
  { id: 'history', label: 'History' },
  { id: 'debate', label: 'Debate' },
  { id: 'sources', label: 'Sources' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#hero" className="nav-wordmark">
        Vax<span>Plain</span>
      </a>
      <ul className="nav-links">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{s.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
