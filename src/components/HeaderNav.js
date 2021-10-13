import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { BsChevronLeft } from 'react-icons/bs';
import { FaMicrophone } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';

const HeaderNav = ({ type, symbol }) => {
  const title = {
    home: 'Stocks Watcher',
    details: 'Details',
    noMatch: 'Error',
  };

  return (
    <div className="d-flex justify-content-around align-items-center py-1 dark-bg position-sticky">
      <Link to="/" className="link-button mx-3 fs-5">
        {type !== 'home' ? <BsChevronLeft /> : ''}
      </Link>
      <h3 className="body-title-text flex-grow-1 text-center mb-0 pt-1">{`${title[type]}${symbol ? ` - ${symbol}` : ''}`}</h3>
      <button
        type="button"
        onClick={() => {}}
        className="link-button fs-5"
      >
        <FaMicrophone />
      </button>
      <button
        type="button"
        onClick={() => {}}
        className="link-button mx-3 fs-5"
      >
        <IoIosSettings />
      </button>
    </div>
  );
};

HeaderNav.propTypes = {
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  symbol: PropTypes.string,
};

HeaderNav.default = {
  type: 'home',
};

export default HeaderNav;
