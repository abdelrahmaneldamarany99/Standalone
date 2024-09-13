import { useState, useEffect } from "react";
import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerType } from "../Customer/Customer";
import axios from "axios";

const UpdateCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState<
    number | string | readonly string[] | undefined
  >(undefined);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const { dispatch } = useCustomersContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { _id } = useParams();
  const url = "http://localhost:5173";

  useEffect(() => {
    axios
      .get(`${url}/customer/${_id}`)
      .then((res) => setCustomer(res.data))
      .catch((error) => {
        // console.log(error)
        setError(error);
      });
  }, [_id]);

  type Event = {
    preventDefault: () => void;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    axios
      .put(`${url}/updatecustomer/customer/${_id}`, {
        name,
        email,
        number,
        storeName,
        address,
      })
      .then((res) => {
        // console.log(res)
        setName("");
        setEmail("");
        setNumber(undefined);
        setStoreName("");
        setAddress("");
        setError(null);
        dispatch({ type: "UPDATE_CUSTOMER", payload: res.data });
        navigate("home");
      })
      .catch((error) => {
        // console.log(error);
        setError(error);
      });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update Customer</h3>

      <label>Customer Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={customer?.name}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={customer?.email}
      />

      <label>Phone Number:</label>
      <input
        type="number"
        onChange={(e) => setNumber(Number(e.target.value))}
        value={customer?.number}
      />
      <label>Store Name:</label>
      <input
        type="text"
        onChange={(e) => setStoreName(e.target.value)}
        value={customer?.storeName}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={customer?.address}
      />

      <button>Update Customer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateCustomer;
