// router
import PageButton from 'components/PageButtons';
// styles
import 'styles/pages/Home.css'


interface Props{
  children: React.ReactNode | React.ReactNode[]
}

const Home = ({children}: Props) => {
  return ( 
    <>
      <h1>Finite Element Method</h1>
      <h3 className='center no-gutter-top'>Acoustic vibrations of a material layer</h3>
      <div className="page-buttons-container">
        <PageButton to="/equation"><h3>Equation</h3></PageButton>
        <PageButton to="/visualisation"><h3>Visualisation</h3></PageButton>
      </div>
      <div className='body-container'>
        {children}
      </div>
    </>
   );
}
 
export default Home;