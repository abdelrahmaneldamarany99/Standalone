import { useState } from "react";
import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [number, setNumber] = useState<number | null>(null);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useCustomersContext();
  const { user } = useAuthContext();

  type Event = {
    preventDefault: () => void;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const customer = { name, email, contact, number, storeName, address };
    const url = "http://localhost:5173";

    const response = await fetch(`${url}/customerform`, {
      method: "POST",
      body: JSON.stringify(customer),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setEmail("");
      setContact("");
      setNumber(null);
      setStoreName("");
      setAddress("");
      setError("");
      dispatch({ type: "CREATE_CUSTOMER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Customer</h3>

      <label>Customer Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Contact:</label>
      <input
        type="text"
        onChange={(e) => setContact(e.target.value)}
        value={contact}
      />
      <label>Phone Number:</label>
      <input
        type="number"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <label>Store Name:</label>
      <input
        type="number"
        onChange={(e) => setStoreName(e.target.value)}
        value={storeName}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setContact(e.target.value)}
        value={address}
      />

      <button>Add Customer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CustomerForm;
