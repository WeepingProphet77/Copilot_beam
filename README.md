# Reinforced Concrete Beam Calculator

A React web application for calculating the flexural strength of reinforced concrete beam sections according to ACI 318 building code requirements.

![Beam Calculator Screenshot](https://github.com/user-attachments/assets/5bb16d1a-cb4f-4057-86b6-eaf116bda0f0)

## Features

- **ACI 318 Compliant Calculations**: Implements flexural strength calculations per ACI 318-14
- **Interactive Input Form**: Easy-to-use interface for entering beam properties
- **Real-time Results**: Instant calculation updates as inputs change
- **Visual Beam Cross-Section**: Graphical representation of the beam with stress distribution
- **Comprehensive Analysis**: 
  - Moment capacity calculations (nominal and design)
  - Reinforcement ratio checks (minimum, maximum, balanced)
  - Strain analysis
  - Design validity checks
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth interactions
- **Educational Reference**: Includes ACI 318 code references for each calculation

## Calculations Included

- Nominal moment capacity (Mn)
- Design moment capacity (ϕMn)
- Strength reduction factor (ϕ) based on strain conditions
- Reinforcement ratios (ρ, ρ_min, ρ_max, ρ_balanced)
- Stress block depth and neutral axis location
- Concrete and steel strain values
- Tension-controlled vs compression-controlled section determination

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/WeepingProphet77/Copilot_beam.git
cd Copilot_beam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Enter Beam Geometry**: 
   - Width (b) in inches
   - Height (h) in inches
   - Effective depth (d) in inches

2. **Specify Material Properties**:
   - Concrete compressive strength (f'c) in psi
   - Steel yield strength (fy) in psi

3. **Define Reinforcement**:
   - Select bar size from standard sizes (#3 through #18)
   - Enter number of tension bars

4. **View Results**:
   - Design status indicators (validity, minimum steel, ductility)
   - Moment capacity values
   - Reinforcement ratio analysis with visual scale
   - Stress block and strain details
   - ACI 318 code references

## Technical Details

### Built With

- **React 19** - UI framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients and animations

### Project Structure

```
src/
├── components/
│   ├── InputForm.tsx          # Input form for beam properties
│   ├── BeamVisualization.tsx  # SVG visualization of beam cross-section
│   └── ResultsDisplay.tsx     # Calculation results and analysis
├── utils/
│   └── beamCalculations.ts    # ACI 318 calculation logic
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Disclaimer

⚠️ **For educational and preliminary design purposes only.** 

All structural designs must be verified by a licensed professional engineer. This tool provides calculations based on simplified assumptions and should not be used as the sole basis for structural design decisions.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Calculations based on ACI 318-14: Building Code Requirements for Structural Concrete
- Developed with modern web technologies for optimal user experience
