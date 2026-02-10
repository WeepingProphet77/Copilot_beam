import { useState, useMemo } from 'react';
import InputForm from './components/InputForm';
import BeamVisualization from './components/BeamVisualization';
import ResultsDisplay from './components/ResultsDisplay';
import { calculateBeamStrength, getBarArea } from './utils/beamCalculations';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    b: 12,      // 12 inches width
    h: 24,      // 24 inches height
    d: 21.5,    // 21.5 inches effective depth (h - 2.5")
    fc: 4000,   // 4000 psi concrete strength
    fy: 60000,  // 60 ksi steel yield strength
    barSize: 8,
    numBars: 4,
  });

  const results = useMemo(() => {
    const As = getBarArea(inputs.barSize) * inputs.numBars;
    return calculateBeamStrength({ ...inputs, As });
  }, [inputs]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🏗️</span>
            Reinforced Concrete Beam Calculator
          </h1>
          <p className="app-subtitle">ACI 318 Flexural Strength Analysis</p>
        </div>
      </header>

      <main className="app-main">
        <div className="content-grid">
          <div className="left-column">
            <InputForm values={inputs} onChange={setInputs} />
          </div>
          
          <div className="right-column">
            <BeamVisualization
              b={inputs.b}
              h={inputs.h}
              d={inputs.d}
              a={results.a}
              numBars={inputs.numBars}
            />
            
            <ResultsDisplay results={results} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          ⚠️ For educational and preliminary design purposes only. 
          All structural designs must be verified by a licensed professional engineer.
        </p>
        <p className="footer-note">
          Based on ACI 318-14 Building Code Requirements for Structural Concrete
        </p>
      </footer>
    </div>
  );
}

export default App;
