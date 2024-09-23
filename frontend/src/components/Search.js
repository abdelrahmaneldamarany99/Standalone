import { useContext, useState } from "react";
// import { BsSearch } from "react-icons/bs";
import { CustomersContext } from "../context/CustomersContext";

const Search = () => {
  const [key, setKey] = useState("");
  const [searched, setSearched] = useState(false);
  const { customers, dispatch } = useContext(CustomersContext);

  const searchCustomers = (e) => {
    setSearched(true);
    setKey(e.target.value);
    if (customers.length) {
      dispatch({ type: "SEARCH_CUSTOMERS", payload: e.target.value });
    }
  };
  return (
    <div className="search-results">
      <input
        type="text"
        className="search-customers"
        value={key}
        onChange={(e) => searchCustomers(e)}
        placeholder="Search for customers by name"
      />
    </div>
  );
};

export default Search;
