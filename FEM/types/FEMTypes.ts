type SingleVariableFunction = (x: number) => number;
type SplineFunction = [SingleVariableFunction, SingleVariableFunction];
type Spline = SplineFunction[];
type SplineDerivativeFunction = [number, number];
type Interval = [number, number];
interface FEMResult{
  coefficientArray: number[];
  domain: Interval;
  delta: number;
  spline: Spline;
}

export type {SingleVariableFunction, SplineFunction, SplineDerivativeFunction, Interval, Spline, FEMResult}