import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { loadStocks } from '../redux/Home/stocksList';
import HeaderNav from '../components/HeaderNav';
import StockForm from '../components/StockForm';

const Home = () => {
  const { allStocks } = useSelector((state) => state.stocksList);
  const dispatch = useDispatch();
  const loadStocksAction = bindActionCreators(loadStocks, dispatch);
  const home = 'home';

  useEffect(() => {
    if (allStocks.length === 0) loadStocksAction();
  }, []);

  return (
    <>
      <HeaderNav type={`${home}`} />
      <StockForm allStocks={allStocks} />
    </>
  );
};

export default Home;
