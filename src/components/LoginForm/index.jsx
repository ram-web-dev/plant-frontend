import { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./index.css";

import { apiUrl } from "../../constants";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setCookieAndNavigate = (jwtToken, role) => {
    Cookies.set("jwtToken", jwtToken, { expires: 30 });
    Cookies.set("role", role, { expires: 30 });
    navigate("/products");
  };

  const onSubmitLoginForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    const url = `${apiUrl}/login`;

    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      setCookieAndNavigate(data.jwtToken, data.role);
    } else {
      setErrMsg(data.errMsg);
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={onSubmitLoginForm} className="form mt-5 ms-5">
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Form.Text className="text-danger">{errMsg}</Form.Text>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        disabled={isLoading}
        className="bold"
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
