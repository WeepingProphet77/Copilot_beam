/**
 * ACI 318 Reinforced Concrete Beam Strength Calculator
 * 
 * This module implements calculations for flexural strength of reinforced concrete
 * beams according to ACI 318 building code requirements.
 */

export interface BeamInput {
  b: number;      // Width of beam (inches)
  h: number;      // Total height of beam (inches)
  d: number;      // Effective depth (inches)
  fc: number;     // Concrete compressive strength (psi)
  fy: number;     // Steel yield strength (psi)
  As: number;     // Area of tension reinforcement (sq. inches)
  numBars: number; // Number of bars
}

export interface BeamResults {
  // Reinforcement ratio
  rho: number;
  rhoMin: number;
  rhoMax: number;
  rhoBalanced: number;
  
  // Strength calculations
  a: number;          // Depth of equivalent rectangular stress block (inches)
  c: number;          // Depth to neutral axis (inches)
  Mn: number;         // Nominal moment capacity (kip-ft)
  phiMn: number;      // Design moment capacity (kip-ft)
  phi: number;        // Strength reduction factor
  
  // Checks
  isUnderReinforced: boolean;
  meetsMinSteel: boolean;
  isValid: boolean;
  
  // Strain values
  epsilonT: number;   // Tensile strain in steel
  epsilonC: number;   // Compressive strain in concrete
}

const BETA1_FC_4000 = 0.85;
const BETA1_FC_8000 = 0.65;
const EPSILON_C_MAX = 0.003; // Maximum concrete strain
const EPSILON_Y_MIN = 0.005; // Minimum steel strain for tension-controlled

/**
 * Calculate beta1 based on concrete strength (ACI 318-14: 22.2.2.4.3)
 */
function calculateBeta1(fc: number): number {
  if (fc <= 4000) {
    return BETA1_FC_4000;
  } else if (fc >= 8000) {
    return BETA1_FC_8000;
  } else {
    // Linear interpolation between 4000 and 8000 psi
    return BETA1_FC_4000 - ((fc - 4000) / 4000) * (BETA1_FC_4000 - BETA1_FC_8000);
  }
}

/**
 * Calculate minimum reinforcement ratio (ACI 318-14: 9.6.1.2)
 */
function calculateRhoMin(fc: number, fy: number): number {
  const rhoMin1 = (3 * Math.sqrt(fc)) / fy;
  const rhoMin2 = 200 / fy;
  return Math.max(rhoMin1, rhoMin2);
}

/**
 * Calculate balanced reinforcement ratio
 */
function calculateRhoBalanced(fc: number, fy: number): number {
  const beta1 = calculateBeta1(fc);
  const epsilonY = fy / 29000000; // Steel modulus = 29,000 ksi = 29,000,000 psi
  
  return (0.85 * fc * beta1 / fy) * (EPSILON_C_MAX / (EPSILON_C_MAX + epsilonY));
}

/**
 * Calculate maximum reinforcement ratio (75% of balanced for ductility)
 */
function calculateRhoMax(fc: number, fy: number): number {
  return 0.75 * calculateRhoBalanced(fc, fy);
}

/**
 * Calculate strength reduction factor phi based on strain (ACI 318-14: 21.2.2)
 */
function calculatePhi(epsilonT: number): number {
  if (epsilonT >= EPSILON_Y_MIN) {
    // Tension-controlled
    return 0.9;
  } else if (epsilonT <= 0.002) {
    // Compression-controlled
    return 0.65;
  } else {
    // Transition zone - linear interpolation
    return 0.65 + (epsilonT - 0.002) / (EPSILON_Y_MIN - 0.002) * (0.9 - 0.65);
  }
}

/**
 * Main calculation function for beam strength per ACI 318
 */
export function calculateBeamStrength(input: BeamInput): BeamResults {
  const { b, h, d, fc, fy, As } = input;
  
  // Calculate reinforcement ratio
  const rho = As / (b * d);
  const rhoMin = calculateRhoMin(fc, fy);
  const rhoBalanced = calculateRhoBalanced(fc, fy);
  const rhoMax = calculateRhoMax(fc, fy);
  
  // Calculate depth of stress block using equilibrium
  // T = C => As * fy = 0.85 * fc * a * b
  const a = (As * fy) / (0.85 * fc * b);
  
  // Calculate beta1 for this concrete strength
  const beta1 = calculateBeta1(fc);
  
  // Calculate depth to neutral axis
  const c = a / beta1;
  
  // Calculate strains using similar triangles
  const epsilonC = EPSILON_C_MAX;
  const epsilonT = epsilonC * (d - c) / c;
  
  // Calculate strength reduction factor
  const phi = calculatePhi(epsilonT);
  
  // Calculate nominal moment capacity (internal couple)
  // Mn = T * (d - a/2) or Mn = C * (d - a/2)
  const MnInchKips = As * fy * (d - a / 2); // in-kips
  const Mn = MnInchKips / 12; // Convert to kip-ft
  
  // Calculate design moment capacity
  const phiMn = phi * Mn;
  
  // Perform checks
  const isUnderReinforced = rho <= rhoMax;
  const meetsMinSteel = rho >= rhoMin;
  const isValid = isUnderReinforced && meetsMinSteel && d < h && As > 0;
  
  return {
    rho,
    rhoMin,
    rhoMax,
    rhoBalanced,
    a,
    c,
    Mn,
    phiMn,
    phi,
    isUnderReinforced,
    meetsMinSteel,
    isValid,
    epsilonT,
    epsilonC,
  };
}

/**
 * Helper function to get reinforcement area for standard bars
 */
export function getBarArea(barSize: number): number {
  const barAreas: { [key: number]: number } = {
    3: 0.11,
    4: 0.20,
    5: 0.31,
    6: 0.44,
    7: 0.60,
    8: 0.79,
    9: 1.00,
    10: 1.27,
    11: 1.56,
    14: 2.25,
    18: 4.00,
  };
  
  return barAreas[barSize] || 0;
}

/**
 * Get bar sizes available
 */
export function getAvailableBarSizes(): number[] {
  return [3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 18];
}
