import type { VaccineData } from '../data/vaccines';
import Section from './Section';

interface Props {
  data: VaccineData;
}

function riskClass(level: string): string {
  return `risk-badge risk-badge--${level.toLowerCase()}`;
}

function dotClass(level: string): string {
  return `regional-risk-dot regional-risk-dot--${level.toLowerCase()}`;
}

export default function ThreatLevel({ data }: Props) {
  const { threat } = data;
  const isWarning = threat.globalRisk === 'High' || threat.globalRisk === 'Critical';

  return (
    <Section id="threat" dark>
      <p className="section-label">04 — Current Threat Level</p>
      <h2 className="section-title">How urgent is the risk</h2>
      <p className="section-subtitle">{threat.outbreakStatus}</p>

      {/* Alert Banner */}
      <div className={`alert-banner alert-banner--${isWarning ? 'warning' : 'info'}`}>
        <span>{threat.alertLevel}</span>
        <span className="alert-source">{threat.alertSource}</span>
      </div>

      {/* Stats Row */}
      <div className="stat-callout">
        <div className="stat-item">
          <span className="stat-value">
            <span className={riskClass(threat.globalRisk)}>{threat.globalRisk}</span>
          </span>
          <span className="stat-label">Global Risk Level</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{threat.currentCoverage}%</span>
          <span className="stat-label">Current Coverage</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{threat.herdImmunityThreshold}%</span>
          <span className="stat-label">Herd Immunity Target</span>
        </div>
      </div>

      {/* Herd Immunity Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-labels">
          <span>0%</span>
          <span>Current coverage: {threat.currentCoverage}%</span>
          <span>100%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${threat.currentCoverage}%` }}
          />
          <div
            className="progress-bar-threshold"
            style={{ left: `${threat.herdImmunityThreshold}%` }}
          >
            <span className="progress-bar-threshold-label">
              Herd immunity: {threat.herdImmunityThreshold}%
            </span>
          </div>
        </div>
      </div>

      {/* Regional Risks */}
      <div style={{ marginTop: 40 }}>
        <p className="chart-title">Regional Risk Assessment</p>
        <div className="regional-risks">
          {threat.regionalRisks.map((r, i) => (
            <div key={i} className="regional-risk">
              <div className={dotClass(r.level)} />
              <span>{r.region}</span>
              <span style={{ opacity: 0.5, fontSize: 11, textTransform: 'uppercase' }}>
                {r.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
