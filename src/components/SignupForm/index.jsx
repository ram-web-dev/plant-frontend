import { useState } from "react";
import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { apiUrl } from "../../constants";

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitSignupForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const singupDetails = {
      username,
      email,
      password,
    };

    const url = `${apiUrl}/signup`;

    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(singupDetails),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      navigate("/login");
    } else {
      const data = await response.json();
      setErrMsg(data.errMsg);
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={onSubmitSignupForm} className="form mt-5 ms-5">
      <Form.Group className="mb-3" controlId="signupname">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupEmail">
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

      <Form.Group className="mb-3" controlId="signupPassword">
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
        SignUp
      </Button>
    </Form>
  );
};

export default SignupForm;
