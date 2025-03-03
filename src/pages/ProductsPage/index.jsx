import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import ProductsList from "../../components/ProductsList";

const ProductsPage = () => {
  return (
    <Container className="pt-3">
      <Header />
      <ProductsList />
    </Container>
  );
};

export default ProductsPage;
