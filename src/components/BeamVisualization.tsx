import React from 'react';
import './BeamVisualization.css';

interface BeamVisualizationProps {
  b: number;  // width
  h: number;  // height
  d: number;  // effective depth
  a: number;  // compression block depth
  numBars: number;
}

const BeamVisualization: React.FC<BeamVisualizationProps> = ({ 
  b, h, d, a, numBars 
}) => {
  // Scale factors for visualization
  const scale = 200 / Math.max(h, b);
  const scaledHeight = h * scale;
  const scaledWidth = b * scale;
  const scaledD = d * scale;
  const scaledA = a * scale;
  
  // Calculate bar positions
  const barRadius = 4;
  const spacing = numBars > 1 ? (scaledWidth - 40) / (numBars - 1) : 0;
  
  return (
    <div className="beam-visualization">
      <svg 
        width={scaledWidth + 100} 
        height={scaledHeight + 80}
        viewBox={`0 0 ${scaledWidth + 100} ${scaledHeight + 80}`}
      >
        <defs>
          <pattern id="concrete" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill="#e8e8e8"/>
            <circle cx="2" cy="2" r="0.5" fill="#d0d0d0"/>
          </pattern>
          <linearGradient id="compressionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Beam cross section */}
        <rect
          x="50"
          y="40"
          width={scaledWidth}
          height={scaledHeight}
          fill="url(#concrete)"
          stroke="#333"
          strokeWidth="2"
        />
        
        {/* Compression stress block */}
        <rect
          x="50"
          y="40"
          width={scaledWidth}
          height={scaledA}
          fill="url(#compressionGradient)"
          opacity="0.7"
        />
        
        {/* Neutral axis line */}
        <line
          x1="45"
          y1={40 + scaledA / 0.85}
          x2={55 + scaledWidth}
          y2={40 + scaledA / 0.85}
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Effective depth line */}
        <line
          x1="45"
          y1={40 + scaledD}
          x2={55 + scaledWidth}
          y2={40 + scaledD}
          stroke="#10b981"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        
        {/* Reinforcement bars */}
        {Array.from({ length: numBars }).map((_, i) => {
          const x = numBars === 1 
            ? 50 + scaledWidth / 2 
            : 50 + 20 + i * spacing;
          const y = 40 + scaledD;
          
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={barRadius}
                fill="#666"
                stroke="#333"
                strokeWidth="1"
              />
              <circle
                cx={x}
                cy={y}
                r={barRadius - 1}
                fill="none"
                stroke="#999"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
        
        {/* Dimension labels */}
        <g className="dimension-label">
          {/* Width dimension */}
          <line x1="50" y1={scaledHeight + 50} x2={50 + scaledWidth} y2={scaledHeight + 50} stroke="#666" strokeWidth="1"/>
          <line x1="50" y1={scaledHeight + 45} x2="50" y2={scaledHeight + 55} stroke="#666" strokeWidth="1"/>
          <line x1={50 + scaledWidth} y1={scaledHeight + 45} x2={50 + scaledWidth} y2={scaledHeight + 55} stroke="#666" strokeWidth="1"/>
          <text x={50 + scaledWidth / 2} y={scaledHeight + 70} textAnchor="middle" fill="#666" fontSize="12">
            b = {b}"
          </text>
        </g>
        
        <g className="dimension-label">
          {/* Height dimension */}
          <line x1="30" y1="40" x2="30" y2={40 + scaledHeight} stroke="#666" strokeWidth="1"/>
          <line x1="25" y1="40" x2="35" y2="40" stroke="#666" strokeWidth="1"/>
          <line x1="25" y1={40 + scaledHeight} x2="35" y2={40 + scaledHeight} stroke="#666" strokeWidth="1"/>
          <text x="15" y={40 + scaledHeight / 2} textAnchor="middle" fill="#666" fontSize="12" transform={`rotate(-90 15 ${40 + scaledHeight / 2})`}>
            h = {h}"
          </text>
        </g>
        
        {/* Legend */}
        <g transform={`translate(${scaledWidth + 70}, 40)`}>
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill="#333">Legend:</text>
          
          <rect x="0" y="10" width="15" height="10" fill="url(#compressionGradient)" stroke="#333" strokeWidth="1"/>
          <text x="20" y="19" fontSize="10" fill="#666">Compression</text>
          
          <line x1="0" y1="30" x2="15" y2="30" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5"/>
          <text x="20" y="34" fontSize="10" fill="#666">N.A.</text>
          
          <line x1="0" y1="45" x2="15" y2="45" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3"/>
          <text x="20" y="49" fontSize="10" fill="#666">d = {d.toFixed(1)}"</text>
          
          <circle cx="7.5" cy="60" r="4" fill="#666" stroke="#333" strokeWidth="1"/>
          <text x="20" y="64" fontSize="10" fill="#666">Steel ({numBars} bars)</text>
        </g>
      </svg>
    </div>
  );
};

export default BeamVisualization;
