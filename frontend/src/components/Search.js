import React,{ useState } from "react";
// import { BsSearch } from "react-icons/bs";
import CustomerDetails from "../components/CustomerDetails";

const Search = ({ customers }) => {
  const [key, setKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchCustomers = (e) => {
    setSearched(true);
    // setKey(e.target.value);
    if (customers) {
      setSearchResults(
        customers.filter(
          (customer) =>
            new RegExp(e.target.value, "ig").test(customer.name) ||
            new RegExp(customer.name, "ig").test(e.target.value)
        )
      );
    }
  };
  return (
    <>
      <input
        type="text"
        className="search-customers"
        // value={key}
        onChange={(e) => searchCustomers(e)}
        placeholder="Search for customers by name"
      />
      {searchResults.length &&
        searchResults.map((customer) => {
          <CustomerDetails key={customer._id} customer={customer} />;
        })}
    </>
  );
};

export default React.memo(Search);
