import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, error, isLoading } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signin(email, password);
  };

  return (
    <Form className="signin-bg" onSubmit={handleSubmit}>
      <h3 className="badge badge-info">Sign In</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!(email.trim() && password.trim()) || isLoading}
      >
        Sign In
      </Button>
      {error && <div className="error"> Something went wrong {error}</div>}
    </Form>
  );
};

export default Signin;
