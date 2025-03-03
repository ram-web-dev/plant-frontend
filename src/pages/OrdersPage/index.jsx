import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import OrderList from "../../components/OrderList";

const OrdersPage = () => {
  return (
    <Container className="pt-3">
      <Header />
      <OrderList />
    </Container>
  );
};

export default OrdersPage;
