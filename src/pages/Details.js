import { useParams } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';

const Details = () => {
  const { slug } = useParams();
  const details = 'details';

  return (
    <>
      <HeaderNav type={`${details}`} symbol={slug} />
    </>
  );
};

export default Details;
