import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <>
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
      <Button
        variant="primary"
        type="submit"
        disabled={!email.trim()}
      >
        Send
      </Button>
    </>
  );
};

export default ForgotPassword;
