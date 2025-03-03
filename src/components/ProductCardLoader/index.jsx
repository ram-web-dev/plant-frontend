import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";

const ProductCardLoader = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="holder.js/100px180"
        className="card-img w-100"
      />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <div className="d-flex justify-content-center align-items-baseline mb-3">
          <Placeholder.Button variant="warning" xs={3} />
          <Placeholder xs={4} className="text-dark ms-3 me-3" />
          <Placeholder.Button variant="warning" xs={3} />
        </div>
        <Placeholder.Button variant="warning" xs={12} />
      </Card.Body>
    </Card>
  );
};

export default ProductCardLoader;
