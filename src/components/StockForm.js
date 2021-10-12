import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const StockForm = () => {
  const [stockSearch, setStockSearch] = useState('');
  const [exchangeSearch, setExchangeSearch] = useState('ALL');
  const [typeSearch, setTypeSearch] = useState('ALL');

  return (
    <Form className="d-flex my-3 control-text position-sticky">
      <Form.Control size="sm" type="text" placeholder="Stock search..." value={stockSearch} onChange={(e) => setStockSearch(e.target.value)} />
      <Form.Select value={exchangeSearch} onChange={(e) => setExchangeSearch(e.target.value)}>
        <option value="ALL">All Exchanges</option>
        <option value="AMEX">New York Stock Exchange Arca</option>
        <option value="NASDAQ">Nasdaq Global Market</option>
        <option value="NYSE">New York Stock Exchange</option>
        <option value="EURONEXT">EURONEXT</option>
        <option value="TSX">TSX (Toronto)</option>
        <option value="XETRA">XETRA (Germany)</option>
        <option value="LSE">LSE (London)</option>
        <option value="SIX">SIX (Zurich)</option>
        <option value="JNB">JNB (Johannesburg)</option>
        <option value="MCX">MCX (India)</option>
        <option value="NSE">NSE (India)</option>
        <option value="HKSE">HKSE (Hong Kong)</option>
        <option value="OSE">OSE (Osaka)</option>
        <option value="JPX">JPX (Tokio)</option>
        <option value="SET">SET (Thailand)</option>
        <option value="OTHERS">Other Exchanges</option>
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

export default StockForm;
