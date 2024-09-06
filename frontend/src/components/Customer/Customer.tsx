import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export type CustomerType = {
  _id?: string;
  name: string;
  email: string;
  contact: string;
  number: number;
  storeName: string;
  address: string;
};

type CustomerProps = {
  customer: CustomerType;
}

const Customer = ({ customer }: CustomerProps) => {
  const { dispatch } = useCustomersContext();
  const { user } = useAuthContext();
  const url = "http://localhost:5173";
  const handleClick = async () => {
    const response = await fetch(`${url}/customers` + customer._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CUSTOMER", payload: json });
    }
  };
  return (
    <div className="customer-details">
      <h4>{customer.name}</h4>
      <p>
        <strong>Email: </strong>
        {customer.email}
      </p>
      <p>
        <strong>Contact: </strong>
        {customer.contact}
      </p>

      <p>
        <strong>Number: </strong>
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
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default Customer;
