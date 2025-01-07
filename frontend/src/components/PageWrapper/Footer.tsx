// Icons
import { FaCode ,FaGithub  } from "react-icons/fa6";


import 'styles/Footer.css'

const Footer = () => {
  return ( 
    <>
      <hr />
      <footer className="footer-body">
        <p className="footer-links">
          <a href='https://github.com/pFornagiel/finite-element-method'><FaCode/> Source</a>
          <a href='https://github.com/pFornagiel'><FaGithub/> GitHub</a>
        </p>
        <p className='acknowledgment'>Paweł Fornagiel - Differential Equations, AGH 2025</p>
      </footer>
    </>
   );
}
 
export default Footer;