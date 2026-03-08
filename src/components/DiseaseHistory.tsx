import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { VaccineData } from '../data/vaccines';
import Section from './Section';

interface Props {
  data: VaccineData;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>
      {payload.map((p: { name: string; value: number; color: string }, i: number) => (
        <div key={i} className="custom-tooltip-value" style={{ color: p.color }}>
          {p.name}: {formatNumber(p.value)}
        </div>
      ))}
    </div>
  );
}

export default function DiseaseHistory({ data }: Props) {
  const comparisonData = [
    {
      period: 'Pre-Vaccine',
      Cases: data.preVaccine.cases,
      Deaths: data.preVaccine.deaths,
    },
    {
      period: 'Post-Vaccine',
      Cases: data.postVaccine.cases,
      Deaths: data.postVaccine.deaths,
    },
  ];

  const reduction = (
    ((data.preVaccine.cases - data.postVaccine.cases) / data.preVaccine.cases) *
    100
  ).toFixed(1);

  return (
    <Section id="history">
      <p className="section-label">05 — Disease History</p>
      <h2 className="section-title">The arc of {data.disease}</h2>
      <p className="section-subtitle">{data.historicalContext}</p>

      {/* Timeline */}
      <div className="grid-2">
        <div>
          <p className="chart-title">Timeline</p>
          <div className="timeline">
            {data.timeline.map((t, i) => (
              <div key={i} className={`timeline-item timeline-item--${t.type}`}>
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-text">{t.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Chart */}
        <div>
          <p className="chart-title">
            Pre-Vaccine vs. Post-Vaccine Impact
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData} barCategoryGap="30%">
              <XAxis
                dataKey="period"
                tick={{ fontSize: 12, fill: '#555' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#555' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
                tickFormatter={formatNumber}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Cases" fill="rgba(41, 98, 255, 0.7)" />
              <Bar dataKey="Deaths" fill="rgba(229, 57, 53, 0.7)" />
            </BarChart>
          </ResponsiveContainer>

          {/* Comparison Blocks */}
          <div className="comparison">
            <div className="comparison-block comparison-block--pre">
              <div className="comparison-label">{data.preVaccine.period}</div>
              <div className="comparison-number">
                {formatNumber(data.preVaccine.cases)}
              </div>
              <div className="comparison-detail">
                cases &nbsp;/&nbsp; {formatNumber(data.preVaccine.deaths)} deaths
              </div>
            </div>
            <div className="comparison-divider">
              <span className="comparison-divider-arrow">&rarr;</span>
            </div>
            <div className="comparison-block">
              <div className="comparison-label">{data.postVaccine.period}</div>
              <div className="comparison-number comparison-number--decrease">
                {formatNumber(data.postVaccine.cases)}
              </div>
              <div className="comparison-detail">
                cases &nbsp;/&nbsp; {formatNumber(data.postVaccine.deaths)} deaths
                <br />
                <strong style={{ color: '#1B5E20' }}>{reduction}% reduction</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
