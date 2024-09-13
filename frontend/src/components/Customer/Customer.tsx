import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CustomerPropsType, CustomerType } from "../../Types/types";

const Customer = ({ customer }: CustomerPropsType) => {
  const [toggleActivate, setToggleActivate] = useState(true);
  const [error, setError] = useState(null);
  const { customers, setCustomers } = useCustomersContext();
  const { user } = useAuthContext();
  // const url = "http://localhost:5173";

  const handleDelete = (_id: string) => {
    if (!user) {
      return;
    }
    axios
      .delete(`/api/customers/${_id}`) // "js/mockaroo.json"
      .then((res) => {
        setError(null);
        setCustomers(
          res.data.customers.filter(
            (customer: CustomerType) => _id !== customer._id
          )
        );
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className={toggleActivate ? "customer-details" : "deactivated"}>
      <h4>{customer.name}</h4>
      {/* @ts-ignore */}
      <h3 className={!toggleActivate && "h3-deactivated"}>
        {toggleActivate ? "Activated" : "Deactivated"}
      </h3>
      <p>
        <strong>Email: </strong>
        {customer.email}
      </p>

      <p>
        <strong>Contact Number: </strong>
        {customer.number}
      </p>
      <p>
        <strong>Store Name: </strong>
        {customer.storeName}
      </p>
      <p>
        <strong>Address: </strong>
        {customer.address}
      </p>
      <span className="update">
        <Link to={`/updatecustomer/` + customer._id}>update</Link>
      </span>
      <span
        className={toggleActivate ? "deactivate-btn" : "activate-btn"}
        onClick={() => setToggleActivate(!toggleActivate)}
      >
        {toggleActivate ? "deactivate" : "activate"}
      </span>
      <span
        className="material-symbols-outlined"
        onClick={() => handleDelete(customer._id)}
      >
        delete
      </span>
      {error && <div className="error">Couldn't be deleted</div>}
    </div>
  );
};

export default Customer;
