import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import Placeholder from 'react-bootstrap/Placeholder';

const StocksTablePlaceholder = () => {
  const cardsPerPage = 12;

  const renderTablePlaceholder = () => {
    const result = [];
    for (
      let i = 0;
      i < cardsPerPage;
      i += 2) {
      result.push(
        <div className="d-flex" key={`placeholder-${i}`}>
          <Card className={`${i % 4 === 0 ? 'medium-bg' : 'dark-bg'} rounded-0`} style={{ width: '50%' }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Subtitle} className="mb-2" animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder.Button variant="light" xs={6} className="link-button mx-3 fs-5" />
            </Card.Body>
          </Card>
          <Card className={`${i % 4 === 0 ? 'dark-bg' : 'medium-bg'} rounded-0`} style={{ width: '50%' }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Subtitle} className="mb-2" animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder.Button variant="light" xs={6} className="link-button mx-3 fs-5" />
            </Card.Body>
          </Card>
        </div>,
      );
    }
    return result;
  };

  const paginationPlaceholder = () => {
    const items = [];
    const item = (i) => (
      <Placeholder key={`pagination-placeholder-${i}`} xs={1} />
    );

    items.push(item(1));
    items.push(<Pagination.Ellipsis key="ellipsis-01" />);
    for (let i = 2; i <= 4; i += 1) {
      items.push(item(i));
    }
    items.push(<Pagination.Ellipsis key="ellipsis-02" />);
    items.push(item(5));

    return items;
  };

  return (
    <>
      <Pagination className="d-flex justify-content-center" size="sm">
        {paginationPlaceholder()}
      </Pagination>
      {renderTablePlaceholder()}
    </>
  );
};

export default StocksTablePlaceholder;
