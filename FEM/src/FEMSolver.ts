// Util
import * as math from "mathjs"
import createSpline from "./spline";
import glQuadrature from "./quadrature";
// Types
import { Interval, Spline, SingleVariableFunction, FEMResult } from "../types/FEMTypes";

const DEFAULT_DOMAIN: Interval = [0,2]

class FEMSolver{
  private readonly n: number;
  private readonly domain: Interval;
  private readonly spline: Spline;
  private readonly delta: number;
  // Load Vector
  private readonly L:number[];
  // Stiffness Matrix
  private readonly K: number[][];
  // Mass Matrix
  private readonly M: number[][];
  // Boundary Condition Constant Matrix
  // it is always going to be equal to 1, as it is only non-zero 
  // for u= e_(n-1) and v = e_(n-1), where it 
  // equals (x_(n-1) - x_(n-2)) / (x_(n-1) - x_(n-2)) = 1
  private static readonly C: number = 1;
  // Linear Equation Coefficient Matrix
  private readonly B: number[][];

  constructor(numberOfElements: number, domain: Interval = DEFAULT_DOMAIN){
    this.n = numberOfElements+1;
    this.domain = domain;
    this.delta = (domain[1] - domain[0])/ (this.n-1);
    this.spline = createSpline(domain, this.delta, this.n);
    this.L = new Array(this.n);
    this.K = [...Array(this.n)].map(_=>Array(this.n))
    this.M = [...Array(this.n)].map(_=>Array(this.n))
    this.B = [...Array(this.n)].map(_=>Array(this.n).fill(0))

    this.initialiseLoadVector();
    this.initialiseStiffnessMatrix();
    this.initialiseMassMatrix();
    this.initialiseLinearEquationCoefficientMatrix();
  }

  private initialiseLoadVector = () : void => {
    // Edge cases handled by using proper definition of first and last spline functions
    // firstSpline[0] and lastSpline[1] are functions always yielding 0 as result
    for(let i = 0; i < this.n; i++){
      const u0: SingleVariableFunction = (x: number) => math.sin(x) * this.spline[i][0](x);
      const interval0: Interval = [this.domain[0] + (i-1) * this.delta, this.domain[0] + i * this.delta]
      const u1: SingleVariableFunction = (x: number) => math.sin(x) * this.spline[i][1](x);
      const interval1: Interval = [this.domain[0] + i * this.delta, this.domain[0] + (i+1) * this.delta]
      this.L[i] = glQuadrature(u0, interval0) + glQuadrature(u1,interval1)
    }
  }

  private initialiseStiffnessMatrix = () : void => {
    // Derivative of spline functions are constants
    // Thus the definite integral of product of derivative is equal to delta * (u * v)
    // Each derivative is additionally equal to 1/delta or -1/delta
    // Therefore, each e'_ii = 2/delta and each e'_ij = -1/detla
    for(let i = 1; i < this.n; i++){
      this.K[i][i-1] = this.K[i-1][i] = -1/this.delta;
      this.K[i][i] = 2/this.delta;
    }

    // Edge cases
    this.K[0][0] = this.K[this.n-1][this.n-1] = 1/this.delta;
    // Take the Robin Bounary Condition into account here, for only here it will be non-zero 
    this.K[this.n-1][this.n-1] -= FEMSolver.C;
  }

  private initialiseMassMatrix = () : void => {

    for(let i = 1; i < this.n; i++){
      const u1: SingleVariableFunction = this.spline[i-1][1];
      const v0: SingleVariableFunction = this.spline[i][0];
      const v1: SingleVariableFunction = this.spline[i][1];
      const interval0: Interval = [this.domain[0] + (i-1) * this.delta, this.domain[0] + i * this.delta];
      const interval1: Interval = [this.domain[0] + i*this.delta, this.domain[0] + (i+1) * this.delta]
      const f: SingleVariableFunction = (x: number) => u1(x) * v0(x);
      
      this.M[i][i-1] = this.M[i-1][i] = glQuadrature(f, interval0);
      this.M[i][i] = (
        glQuadrature((x:number) => Math.pow(v0(x),2), interval0) + 
        glQuadrature((x: number) => Math.pow(v1(x),2),interval1)
      );
    }
    
    // Edge cases
    this.M[0][0] = glQuadrature((x: number) => Math.pow(this.spline[0][1](x), 2), [this.domain[0], this.domain[0] + this.delta])
    this.M[this.n-1][this.n-1] = glQuadrature((x: number) => Math.pow(this.spline[this.n-1][0](x),2), [this.domain[1] - this.delta, this.domain[1]])
  }

  private initialiseLinearEquationCoefficientMatrix = () : void => {
    for(let i = 0; i < this.n; i++ ){
      this.B[i][i] = this.K[i][i] - this.M[i][i]
      if(i > 0){
        this.B[i-1][i] = this.K[i-1][i] - this.M[i-1][i]
        this.B[i][i-1] = this.K[i][i-1] - this.M[i][i-1]
      }
    }
  }

  public solve(): FEMResult{
    // Calculate LU decomposition for B using partial pivoting, then
    // solve using forward substition
    return {
      coefficientArray: math.lusolve(this.B, this.L) as number[],
      delta: this.delta,
      domain: this.domain,
      spline: this.spline
    }
    
  }

}

export {FEMSolver, DEFAULT_DOMAIN};