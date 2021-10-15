import { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import Form from 'react-bootstrap/Form';
import { filterStocks } from '../redux/Home/stocksList';

const StockForm = ({ allStocks }) => {
  const [stockSearch, setStockSearch] = useState('');
  const [exchangeSearch, setExchangeSearch] = useState('ALL');
  const [typeSearch, setTypeSearch] = useState('ALL');

  const dispatch = useDispatch();
  const filterStocksAction = bindActionCreators(filterStocks, dispatch);

  useEffect(() => {
    filterStocksAction(allStocks, stockSearch, exchangeSearch, typeSearch);
    return null;
  }, [stockSearch, exchangeSearch, typeSearch]);

  return (
    <Form className="d-flex my-3 control-text position-sticky">
      <Form.Control size="sm" type="text" placeholder="Stock search..." value={stockSearch} onChange={(e) => setStockSearch(e.target.value)} />
      <Form.Select value={exchangeSearch} onChange={(e) => setExchangeSearch(e.target.value)}>
        <option value="ALL">All Exchanges</option>
        <option value="AMEX">New York Stock Exchange Arca</option>
        <option value="NASDAQ">Nasdaq Global Market</option>
        <option value="NYSE">New York Stock Exchange</option>
      </Form.Select>
      <Form.Select value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)}>
        <option value="ALL">All types</option>
        <option value="stock">Stocks</option>
        <option value="etf">ETFs</option>
        <option value="fund">Funds</option>
      </Form.Select>
    </Form>
  );
};

StockForm.propTypes = {
  allStocks: PropTypes.arrayOf(PropTypes.shape({
    exchange: PropTypes.string,
    exchangeShortName: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tradable: PropTypes.bool.isRequired,
  })).isRequired,
};

export default StockForm;
