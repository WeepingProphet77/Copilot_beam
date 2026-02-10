import React from 'react';
import type { BeamResults } from '../utils/beamCalculations';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  results: BeamResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const {
    phi,
    Mn,
    phiMn,
    rho,
    rhoMin,
    rhoMax,
    rhoBalanced,
    a,
    c,
    epsilonT,
    epsilonC,
    isUnderReinforced,
    meetsMinSteel,
    isValid,
  } = results;

  return (
    <div className="results-display">
      <h2 className="results-title">Analysis Results</h2>
      
      {/* Status Indicators */}
      <div className="status-section">
        <div className={`status-card ${isValid ? 'valid' : 'invalid'}`}>
          <div className="status-icon">{isValid ? '✓' : '⚠'}</div>
          <div className="status-text">
            <div className="status-label">Overall Status</div>
            <div className="status-value">{isValid ? 'Valid Design' : 'Design Issues'}</div>
          </div>
        </div>
        
        <div className={`status-card ${meetsMinSteel ? 'valid' : 'invalid'}`}>
          <div className="status-icon">{meetsMinSteel ? '✓' : '⚠'}</div>
          <div className="status-text">
            <div className="status-label">Min. Steel Check</div>
            <div className="status-value">{meetsMinSteel ? 'Passed' : 'Failed'}</div>
          </div>
        </div>
        
        <div className={`status-card ${isUnderReinforced ? 'valid' : 'invalid'}`}>
          <div className="status-icon">{isUnderReinforced ? '✓' : '⚠'}</div>
          <div className="status-text">
            <div className="status-label">Ductility Check</div>
            <div className="status-value">{isUnderReinforced ? 'Under-reinforced' : 'Over-reinforced'}</div>
          </div>
        </div>
      </div>

      {/* Strength Results */}
      <div className="results-section strength-section">
        <h3>Moment Capacity</h3>
        <div className="results-grid">
          <div className="result-card primary">
            <div className="result-label">Design Moment Capacity</div>
            <div className="result-value large">ϕMn = {phiMn.toFixed(2)}</div>
            <div className="result-unit">kip-ft</div>
          </div>
          
          <div className="result-card">
            <div className="result-label">Nominal Moment Capacity</div>
            <div className="result-value">Mn = {Mn.toFixed(2)}</div>
            <div className="result-unit">kip-ft</div>
          </div>
          
          <div className="result-card">
            <div className="result-label">Strength Reduction Factor</div>
            <div className="result-value">ϕ = {phi.toFixed(3)}</div>
            <div className="result-unit">{phi >= 0.9 ? 'Tension-controlled' : phi <= 0.65 ? 'Compression-controlled' : 'Transition zone'}</div>
          </div>
        </div>
      </div>

      {/* Reinforcement Ratios */}
      <div className="results-section">
        <h3>Reinforcement Analysis</h3>
        <div className="ratio-comparison">
          <div className="ratio-bar-container">
            <div className="ratio-labels">
              <span>ρ<sub>min</sub> = {rhoMin.toFixed(4)}</span>
              <span>ρ = {rho.toFixed(4)}</span>
              <span>ρ<sub>max</sub> = {rhoMax.toFixed(4)}</span>
            </div>
            <div className="ratio-bar">
              <div className="ratio-range" style={{ left: `${(rhoMin / rhoMax) * 100}%`, width: `${((rhoMax - rhoMin) / rhoMax) * 100}%` }}>
                <span className="range-label">Acceptable Range</span>
              </div>
              <div 
                className={`ratio-indicator ${rho >= rhoMin && rho <= rhoMax ? 'valid' : 'invalid'}`}
                style={{ left: `${(rho / rhoMax) * 100}%` }}
              >
                <div className="indicator-dot"></div>
                <div className="indicator-label">Current ρ</div>
              </div>
            </div>
          </div>
          
          <div className="ratio-details">
            <div className="detail-item">
              <span className="detail-label">Balanced Ratio (ρ<sub>b</sub>):</span>
              <span className="detail-value">{rhoBalanced.toFixed(4)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Current Ratio (ρ):</span>
              <span className="detail-value">{rho.toFixed(4)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Ratio / Balanced:</span>
              <span className="detail-value">{(rho / rhoBalanced).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stress Block Details */}
      <div className="results-section">
        <h3>Stress Block & Strains</h3>
        <div className="detail-grid">
          <div className="detail-card">
            <div className="detail-label">Stress Block Depth (a)</div>
            <div className="detail-value">{a.toFixed(3)}"</div>
          </div>
          
          <div className="detail-card">
            <div className="detail-label">Neutral Axis Depth (c)</div>
            <div className="detail-value">{c.toFixed(3)}"</div>
          </div>
          
          <div className="detail-card">
            <div className="detail-label">Concrete Strain (ε<sub>c</sub>)</div>
            <div className="detail-value">{(epsilonC * 1000).toFixed(2)} × 10⁻³</div>
          </div>
          
          <div className="detail-card">
            <div className="detail-label">Steel Strain (ε<sub>t</sub>)</div>
            <div className="detail-value">{(epsilonT * 1000).toFixed(2)} × 10⁻³</div>
          </div>
        </div>
      </div>

      {/* ACI Code Reference */}
      <div className="code-reference">
        <h4>ACI 318 References</h4>
        <ul>
          <li>Flexural strength provisions: ACI 318-14, Chapter 22</li>
          <li>Strength reduction factors: ACI 318-14, Section 21.2.2</li>
          <li>Minimum reinforcement: ACI 318-14, Section 9.6.1.2</li>
          <li>Maximum reinforcement: 75% of balanced ratio for ductility</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsDisplay;
