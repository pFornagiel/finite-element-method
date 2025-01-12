# Finite Element Method Solver 📉

Single-page application, providing implementation of the Finite Element Method solver for acoustic vibrations of a material layer differential equation, together with problem description and resulting curve plotting. Project for the Differential Equations course at AGH University of Krakow.

The project is divided into following components:
- `FEM`, root directory of Finite Element Method numerical solver, written in Typescript
- `frontend`, root directory of the web UI, written using ReactJS, CSS and Typescript

[Available on Github Pages.](https://pfornagiel.github.io/finite-element-method/)

*Note: The computations are done entirely on the frontend. Given large numbers of elements, visualisation may slow down.*

### Technologies used:
- Typescript
- React

### Requirements
- Node.js `^20.15.1`
- npm `^10.7.0`

### Running locally
- Clone the repository
```bash
git clone https://github.com/pFornagiel/finite-element-method.git
```
- Navigate to the project directory and install dependencies (ensure [npm](https://www.npmjs.com/) is installed)

```bash
cd finite-element-method
npm install
```
- Start the development server
```bash
npm run dev
```
- Open local server URL displayed in console in browser of choice
