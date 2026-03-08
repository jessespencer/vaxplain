import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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

function severityClass(severity: string): string {
  const s = severity.toLowerCase().replace(' ', '-');
  if (s === 'very-rare') return 'severity-very-rare';
  return `severity-${s}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>
      {payload.map((p: { name: string; value: number; color: string }, i: number) => (
        <div key={i} className="custom-tooltip-value" style={{ color: p.color }}>
          {p.name}: {p.name === 'Cases' ? formatNumber(p.value) : `${p.value}%`}
        </div>
      ))}
    </div>
  );
}

export default function DataStats({ data }: Props) {
  return (
    <Section id="data">
      <p className="section-label">03 — Current Data & Statistics</p>
      <h2 className="section-title">What the numbers say</h2>
      <p className="section-subtitle">
        Efficacy rates, adverse events, and vaccination trends — drawn from
        clinical trials and real-world surveillance data.
      </p>

      {/* Efficacy */}
      <div style={{ marginBottom: 48 }}>
        <p className="chart-title">Efficacy</p>
        {data.efficacy.map((e, i) => (
          <div key={i} className="efficacy-row">
            <div className="efficacy-label">
              {e.metric}
              <div className="efficacy-source">{e.source}</div>
            </div>
            <div className="efficacy-bar-container">
              <div className="efficacy-bar-track">
                <div
                  className="efficacy-bar-fill"
                  style={{ width: `${e.rate}%` }}
                />
                <div
                  className="efficacy-bar-ci"
                  style={{
                    left: `${e.confidenceInterval[0]}%`,
                    width: `${e.confidenceInterval[1] - e.confidenceInterval[0]}%`,
                  }}
                />
              </div>
              <span className="efficacy-value">{e.rate}%</span>
              <span className="efficacy-ci">
                CI: {e.confidenceInterval[0]}–{e.confidenceInterval[1]}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Adverse Events */}
      <div style={{ marginBottom: 48 }}>
        <p className="chart-title">Adverse Events</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Frequency</th>
                <th>Rate</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {data.adverseEvents.map((ae, i) => (
                <tr key={i}>
                  <td>{ae.event}</td>
                  <td>{ae.frequency}</td>
                  <td>{ae.rate}</td>
                  <td>
                    <span className={severityClass(ae.severity)}>
                      {ae.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vaccination Rate Chart */}
      <div className="chart-container">
        <p className="chart-title">Vaccination Coverage vs. Reported Cases</p>
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={data.vaccinationRates}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: '#555' }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: '#555' }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={false}
              domain={[0, 100]}
              label={{
                value: 'Coverage %',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 11, fill: '#555' },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: '#555' }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={false}
              tickFormatter={formatNumber}
              label={{
                value: 'Cases',
                angle: 90,
                position: 'insideRight',
                style: { fontSize: 11, fill: '#555' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="right"
              dataKey="cases"
              name="Cases"
              fill="rgba(229, 57, 53, 0.15)"
              stroke="#E53935"
              strokeWidth={1}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="rate"
              name="Coverage"
              stroke="#2962FF"
              strokeWidth={2}
              dot={{ fill: '#2962FF', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="last-updated">
        Data sources: CDC, WHO, VAERS, UKHSA &nbsp;|&nbsp; Last updated:{' '}
        {data.lastUpdated}
      </div>
    </Section>
  );
}
