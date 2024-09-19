import { useEffect, useContext } from "react";

// components
import CustomerDetails from "../components/CustomerDetails";
import CustomerForm from "../components/CustomerForm";
import Search from "../components/Search";

// Context providers for global states
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";

// custom hooks
import useFetch from "../hooks/useFetch";
import useDelayJsx from "../hooks/useDelayJsx";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
  const { customers, dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);
  useDocumentTitle("Home");

  const { loading,error, executeFetch } = useFetch( "/api/customers","GET",{},"GET_CUSTOMERS","/" );
  const { delay } = useDelayJsx(5000);

  useEffect(() => {
    const FetchCustomers = async () => {
      await executeFetch();
    };

    if (user) {
      FetchCustomers();
    }
  }, [dispatch, user,executeFetch]);

  return (
    <div className="home">
      <Search customers={customers} />
      {loading && <h1 className="no-customers">Loading...</h1>}
      {error && <h1 className="error">Something went wrong</h1>}
      <div className="customers">
        {customers?.length ? (
          customers.map((customer) => (
            <CustomerDetails key={customer._id} customer={customer} />
          ))
        ) : delay ? null : (
          <h1 className="no-customers">No Customers Found</h1>
        )}
      </div>
      <CustomerForm />
    </div>
  );
};

export default Home;
