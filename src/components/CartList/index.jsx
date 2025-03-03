import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ListGroup from "react-bootstrap/ListGroup";
import { apiUrl } from "../../constants.js";

import CartItem from "../CartItem";
import Loader from "../Loader/index.jsx";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const CartList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const total = cartList.reduce((totalPrice, cartItem) => {
    return totalPrice + cartItem.quantity * cartItem.price;
  }, 0);

  const updateItemQuantity = (id, updatedQuantity) => {
    setCartList(
      cartList.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: updatedQuantity };
        }
        return cartItem;
      })
    );
  };

  const deleteItem = (id) => {
    setCartList(cartList.filter((cartItem) => cartItem.id !== id));
  };

  const fetchCartList = async () => {
    const jwtToken = Cookies.get("jwtToken");
    setIsLoading(true);
    const url = `${apiUrl}/cart`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setCartList(data.cartList);
    setIsLoading(false);
  };

  const onClickPlaceOrder = async () => {
    const jwtToken = Cookies.get("jwtToken");
    setIsLoading(true);
    const url = `${apiUrl}/orders`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "POST",
    };
    await fetch(url, options);
    setCartList([]);
    setIsLoading(false);
    toast("Order Placed successfully");
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ListGroup className="mt-5">
        {cartList.length > 0 ? (
          cartList?.map((cartItem) => (
            <CartItem
              itemDetails={cartItem}
              key={cartItem.id}
              deleteItem={deleteItem}
              updateItemQuantity={updateItemQuantity}
            />
          ))
        ) : (
          <h1 className="text-center bold">No Items in the cart</h1>
        )}
      </ListGroup>
      {cartList.length > 0 && (
        <div className="mt-3 d-flex justify-content-end">
          <Button
            variant="success"
            onClick={onClickPlaceOrder}
            className="bold"
          >{`Place Order (Total: ${total})`}</Button>
        </div>
      )}
    </>
  );
};

export default CartList;
