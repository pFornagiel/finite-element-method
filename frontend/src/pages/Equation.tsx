// Latex
import Latex from "react-latex-next";

const Equation = () => {
  return ( 
    <>
      <h3>Problem Statement</h3>
      <p>
        Differential Equation of acoustic vibrations of a material layer is defined as follows:
      </p>
      <Latex>{String.raw`$$ -\frac{d^2 u(x)}{dx^2} - u = \sin x, \quad  x \in [0, 2]$$`}</Latex>
      <Latex>{String.raw`$$u(0) = 0$$`}</Latex>
      <Latex>{String.raw`$$\frac{du(2)}{dx} - u(2) = 0$$`}</Latex>
      <p>
        Where <Latex>{String.raw`$u(x)$`}</Latex> is a function and <Latex>{String.raw`$u(x) \in \mathbb{R}$`}</Latex>.
        In order to find a solution to the problem using <span style={{fontWeight: 600}}>Finite Element Method</span>, the equation has to be expressed in its weak form.
      </p>
      
      <h3>Weak Form Derivation</h3>
      <p>The weak form of the equation is derived as follows:</p>
      <p>Multiply by a test function <Latex>{String.raw`$v(x) \in H_0^1(0, 2)$`}</Latex> and integrate over the domain of the function</p>
      <Latex>{String.raw`$$\int_0^2 \left( -\frac{d^2 u}{dx^2} - u \right) v \, dx = \int_0^2 v \sin x \, dx$$`}</Latex>
      <p>Integrate by parts on the term involving the second derivative</p>
      <Latex>{String.raw`$$\int_0^2 -\frac{d^2 u}{dx^2} v \, dx = \left[ -\frac{du}{dx} v \right]_0^2 + \int_0^2 \frac{du}{dx} \frac{dv}{dx} \, dx$$`}</Latex>
      <p>Thus, the equation becomes</p>  
      <Latex>{String.raw`$$\int_0^2 \frac{du}{dx} \frac{dv}{dx} \, dx - \left[ \frac{du}{dx} v \right]_0^2 - \int_0^2 u v \, dx = \int_0^2 v \sin x \,  \, dx$$`}</Latex>
      <Latex>{String.raw`$$\int_0^2 \frac{du}{dx} \frac{dv}{dx} \, dx - \frac{du(2)}{dx} v(2) + \frac{du(0)}{dx} v(0) - \int_0^2 u v \, dx = \int_0^2  v \sin x  \, dx$$`}</Latex>
      <p>Applying Dirac and Robin boundary conditions:</p>
      <Latex>{String.raw`$$u(0) = 0 \implies v(0) = 0, \ \ \text{since} \ \ v \in H_0^1(0, 2) $$`}</Latex>
      <Latex>{String.raw`$$\frac{du(2)}{dx} - u(2) = 0 \implies \frac{du(2)}{dx} = u(2)$$`}</Latex>
      <p>Equation eventually simplifies to</p>
      <Latex>{String.raw`$$\int_0^2 \frac{du}{dx} \frac{dv}{dx} \, dx - \int_0^2 u v \, dx + u(2) v(2) = \int_0^2 v \sin x \,  dx$$`}</Latex>
      <p>We may now substitute sides of the equation as follows</p>
      <Latex>{String.raw`$$B(u, v) = \int_0^2 \frac{du}{dx} \frac{dv}{dx} \, dx - \int_0^2 u v \, dx + u(2) v(2)$$`}</Latex>
      <Latex>{String.raw`$$L(v) = \int_0^2 v \sin x  \, dx$$`}</Latex>
      <p>
        Where <Latex>{String.raw`$B(u,v)$`}</Latex> is a bilinear form representing all the terms 
        involving both the solution <Latex>{String.raw`$u$`}</Latex> and the test function <Latex>{String.raw`$v$`}</Latex>,
        and <Latex>{String.raw`$L(v)$`}</Latex> is the linear functional, which contains all the terms on the right-hand side of the weak form.
      </p>
      <p>The equation finally can be expressed simply as</p>
      <Latex>{String.raw`$$B(u,v) = L(v)$$`}</Latex>
    </>
    
   );
}
 
export default Equation