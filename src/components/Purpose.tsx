import type { VaccineData } from '../data/vaccines';
import Section from './Section';

interface Props {
  data: VaccineData;
}

export default function Purpose({ data }: Props) {
  return (
    <Section id="purpose">
      <p className="section-label">01 — Purpose</p>
      <h2 className="section-title">Why this vaccine exists</h2>
      <p className="section-subtitle">
        Understanding what a vaccine targets, how it works, and who it's designed
        to protect.
      </p>

      <div className="grid-3">
        <div className="card">
          <p className="card-label">Target</p>
          <h3 className="card-title">{data.disease}</h3>
          <p className="card-body">
            Caused by <strong>{data.pathogen}</strong>
          </p>
        </div>

        <div className="card">
          <p className="card-label">Mechanism</p>
          <div className="mechanism-badge">{data.mechanismType}</div>
          <p className="card-body">{data.mechanism}</p>
        </div>

        <div className="card">
          <p className="card-label">Recommended For</p>
          <ul className="rec-list">
            {data.recommendedFor.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
