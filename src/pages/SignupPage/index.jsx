import Container from "react-bootstrap/Container";

import Header from "../../components/Header";
import SignupForm from "../../components/SignUpForm";

const SignupPage = () => {
  return (
    <div className="form-bg-container">
      <Container>
        <Header />
        <h1 className="bold mt-5 ms-4">Signup</h1>
        <SignupForm />
      </Container>
    </div>
  );
};

export default SignupPage;
