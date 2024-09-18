import { useState, useEffect, useContext } from "react";
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useFetch from "../hooks/useFetch";

const UpdateCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [customer, setCustomer] = useState(null);

  const { user } = useContext(AuthContext);
  const { customers } = useContext(CustomersContext);
  const { _id } = useParams();

  const { data, loading, error, setError, executeFetch } = useFetch(
    `/api/updatecustomer/customers/${_id}`,
    "PUT",
    { name, email, address, number, storeName },
    "UPDATE_CUSTOMER"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    await executeFetch();
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Update Customer</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Customer Name"
          onChange={(e) => setName(e.target.value)}
          // value={customer.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Customer Email Address"
          onChange={(e) => setEmail(e.target.value)}
          // value={customer.email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          placeholder="Enter Customer Address"
          onChange={(e) => setAddress(e.target.value)}
          // value={customer.address}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Store Name</Form.Label>
        <Form.Control
          type="text"
          name="storeName"
          placeholder="Enter Customer Store Name"
          onChange={(e) => setStoreName(e.target.value)}
          // value={customer.storeName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Contact Number</Form.Label>
        <Form.Control
          type="text"
          name="number"
          placeholder="Enter Customer Contact Number"
          onChange={(e) => setNumber(e.target.value)}
          // value={customer.number}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={
          !loading ||
          !(
            name.trim() &&
            email.trim() &&
            address.trim() &&
            number.trim() &&
            storeName.trim()
          )
        }
      >
        Update Customer
      </Button>
      {error && <div className="error">Something went wromg : {error}</div>}
    </Form>
  );
};

export default UpdateCustomer;
