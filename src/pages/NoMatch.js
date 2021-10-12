import HeaderNav from '../components/HeaderNav';

const NotMatch = () => (
  <>
    <HeaderNav type="noMatch" />
    <h3 className="d-flex justify-content-center align-items-center error-msg">Sorry! Page Not Found...</h3>
  </>
);

export default NotMatch;
