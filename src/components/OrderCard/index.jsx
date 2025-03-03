import Card from "react-bootstrap/Card";
import "./index.css";

const OrderCard = ({ orderItems, orderId }) => {
  const totalPrice = orderItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return (
    <li style={{ listStyleType: "none" }} className="m-3">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title className="bold">{`# ID${orderId}`}</Card.Title>
            <Card.Title className="bold">{`Rs. ${totalPrice}`}</Card.Title>
          </div>

          <ul className="p-0 mt-3">
            {orderItems.map((item) => (
              <li
                key={item.id}
                style={{ listStyleType: "none" }}
                className="d-flex justify-content-between ps-2 pe-2"
              >
                <p className="semi-bold item-name">{`${item.name} ( x ${item.quantity} )`}</p>
                <p className="semi-bold">{`${item.price * item.quantity}`}</p>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </li>
  );
};

export default OrderCard;
