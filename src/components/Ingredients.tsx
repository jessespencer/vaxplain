import type { VaccineData } from '../data/vaccines';
import Section from './Section';

interface Props {
  data: VaccineData;
}

export default function Ingredients({ data }: Props) {
  return (
    <Section id="ingredients" dark>
      <p className="section-label">02 — Ingredients</p>
      <h2 className="section-title">What's in the vaccine</h2>
      <p className="section-subtitle">
        Full ingredient list with roles, safety classifications, and neutral
        context for commonly scrutinized components.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Role</th>
              <th>Safety Classification</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.ingredients.map((ing, i) => (
              <tr key={i} className={ing.scrutinized ? 'row-scrutinized' : ''}>
                <td>
                  {ing.scrutinized ? (
                    <span className="tooltip-trigger">
                      {ing.name}
                      <span className="tooltip-content">
                        {ing.scrutinizedExplainer}
                      </span>
                    </span>
                  ) : (
                    ing.name
                  )}
                </td>
                <td>{ing.role}</td>
                <td>{ing.safetyClassification}</td>
                <td>{ing.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="last-updated" style={{ marginTop: 24 }}>
        Ingredients with a{' '}
        <span style={{ borderLeft: '3px solid var(--color-accent)', paddingLeft: 8 }}>
          blue indicator
        </span>{' '}
        are commonly scrutinized — hover for neutral context.
      </p>
    </Section>
  );
}
