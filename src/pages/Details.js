import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { loadDetails } from '../redux/Details/stockDetails';
import HeaderNav from '../components/HeaderNav';
import CandlestickChart from '../components/CandlestickChart';
import LoadingChart from '../components/LoadingChart';

const Details = () => {
  const { slug } = useParams();
  const {
    loaded, symbol, historicalData,
  } = useSelector((state) => state.stockDetails);
  const dispatch = useDispatch();
  const loadDetailsAction = bindActionCreators(loadDetails, dispatch);
  const details = 'details';

  useEffect(() => {
    loadDetailsAction(slug);
    return null;
  }, [slug]);

  return (
    <>
      <HeaderNav type={`${details}`} symbol={slug} />
      {!loaded && <LoadingChart />}
      <div className="bg-white">
        {loaded && <CandlestickChart type="svg" symbol={symbol} data={historicalData} />}
      </div>
    </>
  );
};

export default Details;
