import { useState, useContext } from "react";
import { CustomersContext } from "../context/CustomersContext";
import useDelayJsx from "../hooks/useDelayJsx";
import CustomerDetails from "./CustomerDetails";

const CustomersComponent = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { customers } = useContext(CustomersContext);
  const { delay } = useDelayJsx(5000);

  return (
    <div className="customers">
      {customers?.length ? (
        customers.map((customer) => (
          <CustomerDetails
            key={customer._id}
            customer={customer}
            showUpdateForm={showUpdateForm}
            setShowUpdateForm={() => setShowUpdateForm(true)}
          />
        ))
      ) : delay ? null : (
        <h1 className="no-customers">No Customers Found Yet</h1>
      )}
    </div>
  );
};

export default CustomersComponent;
