import type { VaccineData } from '../data/vaccines';
import Section from './Section';

interface Props {
  data: VaccineData;
}

export default function Sources({ data }: Props) {
  return (
    <Section id="sources">
      <p className="section-label">07 — Sources & Methodology</p>
      <h2 className="section-title">Where this data comes from</h2>
      <p className="section-subtitle">
        Every claim on this page is traceable to a published source. We list them
        here for verification.
      </p>

      <ul className="sources-list">
        {data.sources.map((s, i) => (
          <li key={i} className="source-item">
            <div className="source-name">
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
            </div>
            <div className="source-description">{s.description}</div>
          </li>
        ))}
      </ul>

      <div className="transparency-statement">
        <h3>Transparency Statement</h3>
        <p>
          VaxPlain is an independent informational resource. Content is curated from
          peer-reviewed research, government health agency publications (CDC, WHO,
          UKHSA), and Cochrane systematic reviews. We do not accept funding from
          pharmaceutical companies or advocacy organizations. Ingredient data is
          sourced directly from FDA-approved prescribing information and package
          inserts. Adverse event data reflects both clinical trial results and
          post-marketing surveillance systems. Arguments in the "Debate" section
          are presented without editorial bias — each is labeled with its evidence
          basis so readers can assess credibility independently. If you find an
          error or outdated statistic, we encourage you to report it.
        </p>
      </div>
    </Section>
  );
}
