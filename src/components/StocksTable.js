import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';

const StocksTable = ({ filteredStocks }) => {
  const cardsPerPage = 12;
  const lastPage = Math.ceil(filteredStocks.length / cardsPerPage);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
    return null;
  }, [filteredStocks]);

  const renderTable = () => {
    const result = [];
    for (
      let i = (activePage - 1) * cardsPerPage;
      i < Math.min(cardsPerPage * activePage, filteredStocks.length);
      i += 2) {
      result.push(
        <div className="d-flex" key={filteredStocks[i + 1] ? `${filteredStocks[i].symbol}-${filteredStocks[i + 1].symbol}` : `${filteredStocks[i].symbol}`}>
          <Card className={`${i % 4 === 0 ? 'medium-bg' : 'dark-bg'} rounded-0`} style={{ width: '50%' }}>
            <Card.Body>
              <Card.Title>
                {filteredStocks[i].symbol}
                {' '}
                -
                {' '}
                {filteredStocks[i].price}
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {filteredStocks[i].exchange}
                {' '}
                -
                {' '}
                {filteredStocks[i].exchangeShortName}
              </Card.Subtitle>
              <Card.Text>
                {filteredStocks[i].name}
                {' '}
                -
                {' '}
                {filteredStocks[i].type}
              </Card.Text>
              <Link to={`/details/${filteredStocks[i].symbol}`} className="link-button mx-3 fs-5">
                See details...
              </Link>
            </Card.Body>
          </Card>
          {filteredStocks[i + 1]
          && (
          <Card className={`${i % 4 === 0 ? 'dark-bg' : 'medium-bg'} rounded-0`} style={{ width: '50%' }}>
            <Card.Body>
              <Card.Title>
                {filteredStocks[i + 1].symbol}
                {' '}
                -
                {' '}
                {filteredStocks[i + 1].price}
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {filteredStocks[i + 1].exchange}
                {' '}
                -
                {' '}
                {filteredStocks[i + 1].exchangeShortName}
              </Card.Subtitle>
              <Card.Text>
                {filteredStocks[i + 1].name}
                {' '}
                -
                {' '}
                {filteredStocks[i + 1].type}
              </Card.Text>
              <Link to={`/details/${filteredStocks[i + 1].symbol}`} className="link-button mx-3 fs-5">
                See details...
              </Link>
            </Card.Body>
          </Card>
          )}
        </div>,
      );
    }
    return result;
  };

  const pagination = () => {
    const items = [];
    const item = (i) => (
      <Pagination.Item key={`page-${i}`} active={activePage === i} onClick={() => setActivePage(i)}>
        {i}
      </Pagination.Item>
    );

    if (lastPage < 8) {
      for (let i = 1; i <= lastPage; i += 1) {
        items.push(item(i));
      }
    } else {
      items.push(item(1));
      items.push(<Pagination.Ellipsis key="ellipsis-1" />);
      if (activePage === 1 || activePage === 2) {
        for (let i = 2; i <= 4; i += 1) {
          items.push(item(i));
        }
      } else if (activePage === lastPage || activePage === lastPage - 1) {
        for (let i = lastPage - 3; i <= lastPage - 1; i += 1) {
          items.push(item(i));
        }
      } else {
        for (let i = activePage - 1; i <= activePage + 1; i += 1) {
          items.push(item(i));
        }
      }
      items.push(<Pagination.Ellipsis key="ellipsis-2" />);
      items.push(item(lastPage));
    }

    return items;
  };

  return (
    <>
      <Pagination className="d-flex justify-content-center" size="sm">
        {pagination()}
      </Pagination>
      {renderTable()}
    </>
  );
};

StocksTable.propTypes = {
  filteredStocks: PropTypes.arrayOf(PropTypes.shape({
    exchange: PropTypes.string,
    exchangeShortName: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tradable: PropTypes.bool.isRequired,
  })).isRequired,
};

export default StocksTable;
