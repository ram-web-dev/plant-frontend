import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Loader from "../Loader";
import { apiUrl } from "../../constants";
import OrderCard from "../OrderCard";

const OrderList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);

  const arrangedOrders = ordersList?.reduce((result, orderItem) => {
    if (orderItem.order_id in result) {
      result[orderItem.order_id].push(orderItem);
    } else {
      result[orderItem.order_id] = [orderItem];
    }
    return result;
  }, {});

  const fetchUserOrders = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwtToken");

    const url = `${apiUrl}/orders`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setOrdersList(data.orders);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <ul className="mt-5 d-flex flex-wrap">
      {Object.keys(arrangedOrders).length > 0 ? (
        Array.from(Object.keys(arrangedOrders)).map((orderId) => (
          <OrderCard
            key={orderId}
            orderItems={arrangedOrders[orderId]}
            orderId={orderId}
          />
        ))
      ) : (
        <h1 className="m-auto bold">No Orders..</h1>
      )}
    </ul>
  );
};

export default OrderList;
