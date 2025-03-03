import { Navigate } from "react-router";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";

import "./index.css";

const HomePage = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return <Navigate to="/products" replace={true} />;
  }
  return (
    <div className="home-bg-container">
      <Container>
        <Header />

        <h1 className="bold text-center mt-5">
          Discover a curated collection of healthy, vibrant plants delivered to
          your door.
        </h1>
      </Container>
    </div>
  );
};

export default HomePage;
