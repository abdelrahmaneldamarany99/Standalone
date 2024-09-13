import {  useState } from "react";
// import { BsSearch } from "react-icons/bs";
import { useCustomersContext } from "../../hooks/useCustomersContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import Customer from "../Customer/Customer";
import useGetApi from "../../hooks/useGetApi";
import { CustomerType } from "../../Types/types";
import useDelayJsx from "../../hooks/useDelayJsx";

const Customers = () => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const { customers, setCustomers } = useCustomersContext();
  const { user, setUser } = useAuthContext();
  // const url = "http://localhost:5173";

  if (user) {
    const { data, loading, error } = useGetApi("/api/customers", [
      user,
      setUser,
    ]);
    setCustomers(data.customers)
    setLoading(loading)
  }

  const searchCustomers = (e) => {
    setSearched(true);
    // setKey(e.target.value);
    if (customers) {
      setSearchResults(
        customers.filter(
          (customer: CustomerType) =>
            new RegExp(e.target.value, "ig").test(customer.name) ||
            new RegExp(customer.name, "ig").test(e.target.value)
        )
      );
    }
  };

  return (
    <div className="home">
      <div className="customers">
        {/* {user && (
          <input
            type="text"
            value={key}
            onChange={(e) => searchCustomers(e)}
            placeholder="Search for customers by name"
          />
        )} */}
        {/* <button className="search-btn">
            <BsSearch />
          </button> */}

        {/* _____________________________________________ */}
        <input
          type="text"
          // value={key}
          onChange={(e) => searchCustomers(e)}
          placeholder="Search for customers by name"
        />
        {/* ________________________________________ */}

        {searchResults.length
          ? searchResults.map((customer: CustomerType) => {
              <Customer key={customer._id} customer={customer} />;
            })
          : searched
          ? useDelayJsx(<h1>No Customers Found</h1>, 5000)
          : null}

        {/* <button className="" onClick={() => setShowCustomers(!showCustomers)}>
          Show Customers
        </button> */}
        {customers.length && !searchResults.length && !key.trim()
          ? customers.map((customer: CustomerType) => (
              <Customer key={customer._id} customer={customer} />
            ))
          : !loading
          ? useDelayJsx(<h1>No Customers Found</h1>, 5000)
          : null}
        {loading && <h1>Loading...</h1>}
      </div>
    </div>
  );
};

export default Customers;
