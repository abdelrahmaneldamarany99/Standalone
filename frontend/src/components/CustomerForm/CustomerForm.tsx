import { useState } from "react";
import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { CustomersType, EventType } from "../../Types/types";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState<
    string | number | readonly string[] | undefined
  >(undefined);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [emptyfields, setEmptyFields] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const { customers, setCustomers } = useCustomersContext();
  const { user } = useAuthContext();
  // const url = "http://localhost:5173";

  const handleSubmit = async (e: EventType) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (
      name.trim() &&
      email.trim() &&
      number &&
      storeName.trim() &&
      address.trim()
    ) {
      setEmptyFields(false);
      const customer = { name, email, number, storeName, address };

      axios
        .post("/api/customers", { customer }) // js/mockaroo.json
        .then((res) => {
          setCustomers((prevState: CustomersType) => {
            prevState.unshift(res.data.customer);
            return prevState;
          });
          setName("");
          setEmail("");
          setNumber("");
          setStoreName("");
          setAddress("");
          setError("");
          setEmptyFields(false);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setEmptyFields(true);
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

      <label>Phone Number:</label>
      <input
        type="number"
        onChange={(e) => setNumber(Number(e.target.value))}
        value={number}
      />
      <label>Store Name:</label>
      <input
        type="text"
        onChange={(e) => setStoreName(e.target.value)}
        value={storeName}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />

      <button onClick={() => setShowForm(!showForm)}>Add Customer</button>
      {emptyfields && (
        <div className="error">Please fill in all fields with valid values</div>
      )}
      {error && (
        <div className="error">{"Something went wrong :\n" + error}</div>
      )}
    </form>
  );
};

export default CustomerForm;
