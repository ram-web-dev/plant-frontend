import Container from "react-bootstrap/Container";

import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import "./index.css";

const Login = () => {
  return (
    <div className="form-bg-container">
      <Container>
        <Header />
        <h1 className="bold mt-5 ms-4">Login</h1>
        <LoginForm />
      </Container>
    </div>
  );
};

export default Login;
