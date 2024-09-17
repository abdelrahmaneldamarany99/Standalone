import { useEffect, useContext } from "react";
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";

// components
import CustomerDetails from "../components/CustomerDetails";
import CustomerForm from "../components/CustomerForm";
import Search from "../components/Search";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { customers, dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);

  const { data, loading, error, setError, executeFetch } = useFetch(
    "/api/customers",
    "GET",
    {},
    "GET_CUSTOMERS"
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      await executeFetch();
    };

    if (user) {
      fetchCustomers();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <Search customers={customers} />
      {loading && <h1 className="no-customers">Loading...</h1>}
      <div className="customers">
        {customers && customers.length ? (
          customers.map((customer) => (
            <CustomerDetails key={customer._id} customer={customer} />
          ))
        ) : !loading ? (
          <h1 className="no-customers">No Customers Found</h1>
        ) : null}
      </div>
      <CustomerForm />
    </div>
  );
};

export default Home;
