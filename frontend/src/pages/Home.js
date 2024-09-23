import { useEffect, useContext, useState } from "react";

// components
import CustomerForm from "../components/CustomerForm";
import Search from "../components/Search";

// Context providers for global states
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";

// custom hooks
import useDocumentTitle from "../hooks/useDocumentTitle";
import CustomersComponent from "../components/CustomersComponent";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);

  useDocumentTitle("Home");

  useEffect(() => {
    setLoading(true);
    const fetchCustomers = async () => {
      const response = await fetch("/api/customers", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "GET_CUSTOMERS", payload: json });
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError(json.error);
      }
    };

    if (user) {
      fetchCustomers();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="search-and-customers">
        <Search />
        {loading && <h1>Loading...</h1>}
        {error && <h1 className="error">Something went wrong</h1>}
        <CustomersComponent />
      </div>
      <CustomerForm />
    </div>
  );
};

export default Home;
