import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CustomersContext } from "../context/CustomersContext";

const UpdateCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [isActivated, setIsActivated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);
  const { _id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!user) {
      setLoading(false);
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/customers/updatecustomer/" + _id, {
      method: "PUT",
      body: JSON.stringify({
        name,
        email,
        number,
        storeName,
        address,
        isActivated,
      }),
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
    } else {
      setName("");
      setEmail("");
      setNumber(0);
      setStoreName("");
      setAddress("");
      setError(null);
      setLoading(false);
      dispatch({ type: "UPDATE_CUSTOMER", payload: json });
      navigate("/");
    }
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
      <select
        className="select-activation-status"
        onChange={(e) => {
          setIsActivated((prev) => !Boolean(e.target.value));
        }}
      >
        <option value={true}>Activate customer</option>
        <option value={""}>Deactivate customer</option>
      </select>
      <Button
        variant="primary"
        type="submit"
        disabled={
          loading ||
          !(
            name.trim() &&
            email.trim() &&
            address.trim() &&
            storeName.trim() &&
            number
          )
        }
      >
        Update Customer
      </Button>
      {error && <div className="error">Something went wrong</div>}
    </Form>
  );
};

export default UpdateCustomer;
