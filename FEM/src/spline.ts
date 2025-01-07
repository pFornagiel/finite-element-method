import { Interval, Spline, SplineFunction } from "../types/FEMTypes"

const createSplineFunction = (leftIntervalBeginning: number, rightIntervalEnd: number, delta: number): SplineFunction => {
  return [(x: number) => (x-leftIntervalBeginning)/delta, (x:number) => (rightIntervalEnd-x)/delta]
}

const createSpline = (domain: Interval, delta: number, n: number) : Spline => {
  const spline: Spline = new Array(n);

  const firstSpline: SplineFunction = [(_: number) => 0, (x: number) => (domain[0]+delta-x)/delta] 
  const lastSpline: SplineFunction = [(x: number) => (x-domain[1]+delta)/delta, (_: number) => 0]

  spline[0] = firstSpline;
  spline[n-1] = lastSpline;
  for(let i = 1; i < n-1; i++){
    spline[i] = createSplineFunction(domain[0] + delta * (i-1), domain[0] + delta * (i+1), delta);
  }
  return spline
}

export default createSpline;