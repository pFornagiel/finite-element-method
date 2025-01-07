import { SingleVariableFunction, Interval } from "../types/FEMTypes";

// Area under curve on interval evaluation using Gauss–Legendre Quadrature
const FIRST_LEGENDRE_ROOT = -0.577350269;
const SECOND_LEGENDRE_ROOT = -FIRST_LEGENDRE_ROOT;
const LEGENDRE_ROOTS = [FIRST_LEGENDRE_ROOT, SECOND_LEGENDRE_ROOT]

const glQuadrature = (f: SingleVariableFunction, interval: Interval) : number => {
  const [a,b] = interval;
  const delta = (b-a)/2
  return LEGENDRE_ROOTS.reduce((prev, x) => prev + delta*f(delta*x+(a+b)/2), 0);
}

export default glQuadrature;