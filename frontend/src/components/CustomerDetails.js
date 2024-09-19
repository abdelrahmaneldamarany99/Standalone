import { useContext, useState } from "react";
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import useFetch from "../hooks/useFetch";

const CustomerDetails = ({ customer }) => {
  const [activationStatus, setActivationStatus] = useState(false);
  const { user } = useContext(AuthContext);

  const { loading, error, executeFetch } = useFetch(
    `/api/customers/${customer._id}`,
    "DELETE",
    {},
    "DELETE_CUSTOMER"
  );

  const handleClick = async () => {
    if (!user) {
      return;
    }
    await executeFetch();
  };

  return (
    <Card className="customer-details mb-3">
      {loading && <h1 className="no-customers">Loading...</h1>}
      {error && <h1 className="error">Something went wrong</h1>}
      <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {activationStatus ? "Deactivated" : "Activated"}
        </Card.Subtitle>
        <Card.Text>
          Customer Email : {customer.email}
          <br />
          Customer Contact Number : {customer.number}
          <br />
          Customer Store Name : {customer.storeName}
          <br />
          Customer Address : {customer.address}
        </Card.Text>
        <button className="btn btn-warning">
          <Link to={`/updatecustomer/` + customer._id}>Update</Link>
        </button>
        <Card.Link>
          <button
            className="btn btn-primary activatation-btn"
            onClick={() => {
              setActivationStatus(!activationStatus);
            }}
          >
            {!activationStatus ? "Deactivate" : "Activate"}
          </button>
        </Card.Link>
        <Card.Link className="btn btn-danger" onClick={handleClick}>
          Delete
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CustomerDetails;
