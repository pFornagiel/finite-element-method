// Router
import { Link, useLocation } from 'react-router-dom'
// Styles
import 'styles/PageButton.css'

interface Props{
  children: String | React.ReactNode,
  to: string
}

const PageButton = ({children, to}: Props) => {
  const location = useLocation();
  return ( 
    <Link to={to} className={`page-button ${location.pathname == to ? 'active' : ''}`}>
      {children}
    </Link>
   );
}
 
export default PageButton;