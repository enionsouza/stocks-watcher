import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { loadDetails } from '../redux/Details/stockDetails';
import HeaderNav from '../components/HeaderNav';

const Details = () => {
  const { slug } = useParams();
  const {
    loaded, symbol, historicalData, ratingData,
  } = useSelector((state) => state.stockDetails);
  const dispatch = useDispatch();
  const loadDetailsAction = bindActionCreators(loadDetails, dispatch);
  const details = 'details';

  useEffect(() => {
    loadDetailsAction(slug);
    return null;
  }, [slug]);

  if (loaded) {
    console.log(symbol);
    console.log(historicalData);
    console.log(ratingData);
  }

  return (
    <>
      <HeaderNav type={`${details}`} symbol={slug} />
    </>
  );
};

export default Details;
