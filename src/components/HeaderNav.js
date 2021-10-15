import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { BsChevronLeft } from 'react-icons/bs';
import { FaMicrophoneSlash } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';

const HeaderNav = ({ type, symbol }) => {
  const [showModal, setShowModal] = useState(false);
  const title = {
    home: 'Stocks Watcher',
    details: 'Details',
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
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
          <FaMicrophoneSlash />
        </button>
        <button
          type="button"
          onClick={handleShowModal}
          className="link-button mx-3 fs-5"
        >
          <BiHelpCircle />
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} className="text-black">
        <Modal.Header closeButton>
          <Modal.Title>Stocks Watcher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This mobile web application was developed as a React Module Capstone Project for
          {' '}
          <a href="https://www.microverse.org/" target="_blank" rel="noreferrer">Microverse Online Bootcamp</a>
          {' '}
          .
          {' '}
          It checks a list of metrics (stock data) provided by an API chosen by the author.
          {' '}
          This frontend app was created with
          {' '}
          <strong>ReactJs and Redux</strong>
          .
        </Modal.Body>
        <Modal.Body>
          The API consumed in this project is the
          {' '}
          <a href="https://financialmodelingprep.com/developer/docs/" target="_blank" rel="noreferrer">Financial Modeling Prep API</a>
          {' '}
          and the original design idea was created by
          {' '}
          <a href="https://www.behance.net/sakwadesignstudio" target="_blank" rel="noreferrer">Nelson Sakwa on Behance</a>
          .
        </Modal.Body>
        <Modal.Footer>
          Built with &hearts; by
          {' '}
          <a href="https://www.linkedin.com/in/enio-neves-de-souza/" target="_blank" rel="noreferrer">Ênio Neves de Souza</a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

HeaderNav.propTypes = {
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default HeaderNav;
