import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CustomersContext } from "../context/CustomersContext";
import useFetch from "../hooks/useFetch";
// import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CustomerForm = () => {
  const { dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  const customer = { name, email, address, number, storeName };
  const { data, loading, error, setError, executeFetch } = useFetch(
    "/api/customers",
    "POST",
    customer,
    "CREATE_CUSTOMER",
    { immediate: false }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    await executeFetch();
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
        <Form.Label>Customer Email address</Form.Label>
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
          type="text"
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
          !(
            name.trim() &&
            email.trim() &&
            address.trim() &&
            number.trim() &&
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

export default CustomerForm;
