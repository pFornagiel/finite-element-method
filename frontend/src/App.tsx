// Router
import { Route, Routes, Navigate } from "react-router-dom";
// Latex
import "katex/dist/katex.min.css";
// Components
import PageWrapper from "components/PageWrapper/PageWrapper";
// Pages
import Home from "pages/Home";
import Equation from "pages/Equation";
import Visualistion from "pages/Visualisation";

function App() {
  return (
    <PageWrapper>
      <Home>
        <Routes>
          <Route path="/equation" element={<Equation />} />
          <Route path="/visualisation" element={<Visualistion />} />
          <Route path="*" element={<Navigate to="/equation" replace />} />
        </Routes>
      </Home>
    </PageWrapper>
  );
}

export default App;
