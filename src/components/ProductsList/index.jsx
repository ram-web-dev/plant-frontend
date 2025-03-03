import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { apiUrl } from "../../constants.js";

import Loader from "../Loader/index.jsx";

import ProductCard from "../ProductCard/index.jsx";

const ProductsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwtToken");

    const url = `${apiUrl}/products`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setProductsList(data.products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <ul className="mt-3 mb-3 d-flex flex-wrap ps-0">
      {productsList?.map((product) => (
        <ProductCard key={product.id} productDetails={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
