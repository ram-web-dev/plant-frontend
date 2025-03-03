import { useState } from "react";
import { Button, Placeholder } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import Cookies from "js-cookie";

import { apiUrl } from "../../constants";
import toast from "react-hot-toast";

const CartItem = ({
  itemDetails: { id, name, price, quantity },
  deleteItem,
  updateItemQuantity,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedQuantity, setUpdateQuantity] = useState(quantity);

  const onClickSave = async () => {
    if (showInput) {
      if (!updatedQuantity || updatedQuantity < 1) {
        toast("Invalid Quantity");
        return;
      }
      setIsLoading(true);
      const jwtToken = Cookies.get("jwtToken");
      const cartItemDetails = {
        cartItemId: id,
        quantity: updatedQuantity,
      };
      const url = `${apiUrl}/cart`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "PATCH",
        body: JSON.stringify(cartItemDetails),
      };
      await fetch(url, options);
      setIsLoading(false);
      updateItemQuantity(id, updatedQuantity);
      toast("cart quantity updated");
    }
    setShowInput((prev) => !prev);
  };

  const onClickDelete = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwtToken");
    const cartItemDetails = {
      cartItemId: id,
    };
    const url = `${apiUrl}/cart`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "DELETE",
      body: JSON.stringify(cartItemDetails),
    };
    await fetch(url, options);
    deleteItem(id);
    toast("Item deleted from cart");
  };

  return (
    <ListGroup.Item className="w-100 pt-3 pb-3">
      {isLoading ? (
        <Placeholder xs={12} />
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <p className="bold">{`${name} ( x ${quantity} )`}</p>
            {showInput ? (
              <div>
                <label>Qty: </label>
                <input
                  type="number"
                  placeholder="quantity"
                  value={updatedQuantity}
                  onChange={(e) => {
                    setUpdateQuantity(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p className="bold">{`Rs.${price * quantity}`}</p>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="warning"
              onClick={onClickSave}
              className="bold text-light"
            >
              {showInput ? "Save" : "Edit"}
            </Button>
            <Button
              className="ms-3 bold"
              variant="danger"
              onClick={onClickDelete}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </ListGroup.Item>
  );
};

export default CartItem;
