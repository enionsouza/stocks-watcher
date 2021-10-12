import HeaderNav from '../components/HeaderNav';
import StockForm from '../components/StockForm';

const Home = () => {
  const home = 'home';

  return (
    <>
      <HeaderNav type={`${home}`} />
      <StockForm />
    </>
  );
};

export default Home;
