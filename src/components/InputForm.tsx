import React from 'react';
import { getAvailableBarSizes, getBarArea } from '../utils/beamCalculations';
import './InputForm.css';

interface InputFormProps {
  values: {
    b: number;
    h: number;
    d: number;
    fc: number;
    fy: number;
    barSize: number;
    numBars: number;
  };
  onChange: (values: {
    b: number;
    h: number;
    d: number;
    fc: number;
    fy: number;
    barSize: number;
    numBars: number;
  }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ values, onChange }) => {
  const handleChange = (field: string, value: number) => {
    onChange({ ...values, [field]: value });
  };

  const barSizes = getAvailableBarSizes();
  const barArea = getBarArea(values.barSize);
  const totalAs = barArea * values.numBars;

  return (
    <div className="input-form">
      <h2 className="form-title">Beam Properties</h2>
      
      <div className="form-section">
        <h3>Geometry</h3>
        <div className="form-row">
          <div className="input-group">
            <label>Width (b)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={values.b}
                onChange={(e) => handleChange('b', parseFloat(e.target.value) || 0)}
                min="1"
                step="0.5"
              />
              <span className="unit">inches</span>
            </div>
          </div>
          
          <div className="input-group">
            <label>Height (h)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={values.h}
                onChange={(e) => handleChange('h', parseFloat(e.target.value) || 0)}
                min="1"
                step="0.5"
              />
              <span className="unit">inches</span>
            </div>
          </div>
        </div>
        
        <div className="input-group">
          <label>Effective Depth (d)</label>
          <div className="input-with-unit">
            <input
              type="number"
              value={values.d}
              onChange={(e) => handleChange('d', parseFloat(e.target.value) || 0)}
              min="1"
              step="0.5"
            />
            <span className="unit">inches</span>
          </div>
          <small className="hint">Typically h - 2.5" for bottom bars</small>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Material Properties</h3>
        <div className="form-row">
          <div className="input-group">
            <label>Concrete Strength (f'c)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={values.fc}
                onChange={(e) => handleChange('fc', parseFloat(e.target.value) || 0)}
                min="1000"
                step="500"
              />
              <span className="unit">psi</span>
            </div>
          </div>
          
          <div className="input-group">
            <label>Steel Yield (fy)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={values.fy}
                onChange={(e) => handleChange('fy', parseFloat(e.target.value) || 0)}
                min="1000"
                step="1000"
              />
              <span className="unit">psi</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Reinforcement</h3>
        <div className="form-row">
          <div className="input-group">
            <label>Bar Size (#)</label>
            <select
              value={values.barSize}
              onChange={(e) => handleChange('barSize', parseInt(e.target.value))}
            >
              {barSizes.map((size) => (
                <option key={size} value={size}>
                  #{size} ({getBarArea(size).toFixed(2)} in²)
                </option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Number of Bars</label>
            <input
              type="number"
              value={values.numBars}
              onChange={(e) => handleChange('numBars', parseInt(e.target.value) || 1)}
              min="1"
              max="20"
              step="1"
            />
          </div>
        </div>
        
        <div className="steel-info">
          <div className="info-item">
            <span className="label">Area per bar:</span>
            <span className="value">{barArea.toFixed(3)} in²</span>
          </div>
          <div className="info-item">
            <span className="label">Total As:</span>
            <span className="value highlight">{totalAs.toFixed(3)} in²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
