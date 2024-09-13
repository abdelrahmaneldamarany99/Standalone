import { useState } from "react";
import CustomerForm from "../CustomerForm/CustomerForm";
import Customers from "../Customers/Customers";

const Home = () => {
  const [toggleAddCancel, setToggleAddCancel] = useState(true);
  return (
    <>
      <button
        className="toggleAddCancel"
        onClick={() => setToggleAddCancel(!toggleAddCancel)}
      >
        {!toggleAddCancel ? "Cancel" : "Add Customer"}
      </button>
      {!toggleAddCancel && <CustomerForm />}
      <Customers />
    </>
  );
};

export default Home;
