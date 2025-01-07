// React
import React, { useState } from "react";
// Plotting
import { Mafs, Coordinates, Theme, Line } from "mafs";
// FEM Solver
import { FEMSolver, DEFAULT_DOMAIN } from "../../FEM/src/FEMSolver";
import { Spline } from "../../FEM/types/FEMTypes";
// Styles
import "styles/pages/Visualisation.css";
import "mafs/core.css";
import "mafs/font.css";

const Visualisation = () => {
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [spline, setSpline] = useState<Spline>([]);
  const [delta, setDelta] = useState<number>(0);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("0");

  const updatePlot = () => {
    if (+inputValue < 0) {
      if (isInvalid) return;
      setIsInvalid(true);
      setTimeout(() => {
        setIsInvalid(false);
      }, 500);
      return;
    }
    const solver = new FEMSolver(+inputValue);
    const { coefficientArray, spline, delta } = solver.solve();
    setCoefficients(coefficientArray);
    setSpline(spline);
    setDelta(delta);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      updatePlot();
    }
  };

  return (
    <>
      <h2 style={{ fontWeight: 500, textAlign: "center" }}>
        Amount of Elements
      </h2>
      <div className="input-container">
        <input
          type="number"
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          value={inputValue}
        />
        <button
          className={isInvalid ? "invalid-input" : ""}
          onClick={updatePlot}
        >
          Visualise
        </button>
      </div>

      <Mafs
        zoom={{ min: 0.7, max: 2 }}
        pan={false}
        viewBox={{
          x: [0, 2],
          y: [-1, 0],
          padding: 0.1,
        }}
      >
        <Coordinates.Cartesian
          xAxis={{
            lines: 0.2,
            subdivisions: false,
            labels: (n) => n.toFixed(1),
          }}
          yAxis={{
            lines: 0.2,
            subdivisions: false,
            labels: (n) => n.toFixed(1),
          }}
        />
        {coefficients.slice(1).map((coefficient, i) => (
          <Line.Segment
            key={i}
            point1={[
              DEFAULT_DOMAIN[0] + i * delta,
              coefficients[i] * spline[i][1](DEFAULT_DOMAIN[0] + i * delta) +
                coefficient * spline[i + 1][0](DEFAULT_DOMAIN[0] + i * delta),
            ]}
            point2={[
              DEFAULT_DOMAIN[0] + (i + 1) * delta,
              coefficients[i] *
                spline[i][1](DEFAULT_DOMAIN[0] + (i + 1) * delta) +
                coefficient *
                  spline[i + 1][0](DEFAULT_DOMAIN[0] + (i + 1) * delta),
            ]}
            color={Theme.blue}
          />
        ))}
      </Mafs>
    </>
  );
};

export default Visualisation;
