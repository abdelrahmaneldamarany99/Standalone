import React,{ useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext"; // <== this is the provider for "user" state
import useFetch from "../hooks/useFetch"; // <== a custom hook to handle requests , post request for this component
// import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CustomerForm = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");

  const { loading, error, setError, executeFetch } = useFetch(
    "/api/customers",
    "POST",
    { name, email, address, number, storeName },
    "CREATE_CUSTOMER",
    "/"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    await executeFetch();
    // setName("");
    // setEmail("");
    // setNumber("");
    // setStoreName("");
    // setAddress("");
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Add Customer</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Customer Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Customer Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          placeholder="Enter Customer Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Store Name</Form.Label>
        <Form.Control
          type="text"
          name="storeName"
          placeholder="Enter Customer Store Name"
          onChange={(e) => setStoreName(e.target.value)}
          value={storeName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Contact Number</Form.Label>
        <Form.Control
          type="number"
          name="number"
          placeholder="Enter Customer Contact Number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={
          loading ||
          !(
            name.trim() &&
            email.trim() &&
            address.trim() &&
            number &&
            storeName.trim()
          )
        }
      >
        Add Customer
      </Button>
      {error && <div className="error">Something went wrong {error}</div>}
    </Form>
  );
};

export default React.memo(CustomerForm);
