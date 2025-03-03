import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { apiUrl } from "../../constants";
import ProductCardLoader from "../ProductCardLoader";
import "./index.css";

const ProductCard = ({
  productDetails: { id, name, image_url, description, price },
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onClickAddToCart = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwtToken");

    const cartItemDetails = {
      productId: id,
      quantity,
    };

    const url = `${apiUrl}/cart`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "POST",
      body: JSON.stringify(cartItemDetails),
    };

    await fetch(url, options);
    setQuantity(1);
    setIsLoading(false);
    toast(`${name} added to cart successfully`);
  };

  return isLoading ? (
    <ProductCardLoader />
  ) : (
    <li className="product-item">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image_url} className="w-100 card-img" />
        <Card.Body>
          <Card.Title>{name} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`Rs. ${price}`}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex justify-content-center align-items-baseline mb-3">
            <Button
              variant="warning"
              onClick={decrementQuantity}
              className="bold text-light"
            >
              -
            </Button>
            <span className="text-dark ms-3 me-3 bold">{quantity}</span>
            <Button
              variant="warning"
              onClick={incrementQuantity}
              className="bold text-light"
            >
              +
            </Button>
          </div>
          <Button
            variant="warning"
            className="w-100 bold text-light"
            onClick={onClickAddToCart}
          >
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </li>
  );
};

export default ProductCard;
