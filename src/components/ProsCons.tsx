import type { VaccineData, ProConPoint } from '../data/vaccines';
import Section from './Section';

interface Props {
  data: VaccineData;
}

function tagClass(sourceType: string): string {
  switch (sourceType) {
    case 'Scientific consensus':
      return 'tag tag--consensus';
    case 'Individual rights argument':
      return 'tag tag--rights';
    case 'Emerging research':
      return 'tag tag--emerging';
    case 'Anecdotal':
      return 'tag tag--anecdotal';
    case 'Contested claim':
      return 'tag tag--contested';
    default:
      return 'tag';
  }
}

function PointCard({ point }: { point: ProConPoint }) {
  return (
    <div className="proscons-card">
      <span className={tagClass(point.sourceType)}>{point.sourceType}</span>
      <h4 className="proscons-claim">{point.claim}</h4>
      <p className="proscons-detail">{point.detail}</p>
    </div>
  );
}

export default function ProsCons({ data }: Props) {
  return (
    <Section id="debate" dark>
      <p className="section-label">06 — The Debate</p>
      <h2 className="section-title">Arguments for and against</h2>
      <p className="section-subtitle">
        Both sides presented with equal weight. Each point is labeled by its
        evidence basis. No editorializing — draw your own conclusions.
      </p>

      <div className="grid-2">
        <div>
          <div className="proscons-header">Arguments For Vaccination</div>
          {data.pros.map((p, i) => (
            <PointCard key={i} point={p} />
          ))}
        </div>
        <div>
          <div className="proscons-header">Arguments Against / Concerns</div>
          {data.cons.map((c, i) => (
            <PointCard key={i} point={c} />
          ))}
        </div>
      </div>
    </Section>
  );
}
