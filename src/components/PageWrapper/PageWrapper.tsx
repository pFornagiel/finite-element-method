// Components
import Footer from "components/PageWrapper/Footer";
// Styles
import 'styles/PageWrapper.css'

interface Props{
  children: React.ReactNode[] | React.ReactNode,
}

const PageWrapper = ({children}:Props) => {
  return ( 
    <div className="main">
      {children}
      <Footer />
    </div>
   );
}
 
export default PageWrapper;