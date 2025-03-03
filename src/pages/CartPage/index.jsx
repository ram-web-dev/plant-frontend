import { Container } from "react-bootstrap";
import CartList from "../../components/CartList";
import Header from "../../components/Header";

const CartPage = () => {
  return (
    <Container className="pt-3">
      <Header />
      <CartList />
    </Container>
  );
};

export default CartPage;
