import {
  useState,
  useContext,
  useCallback,
} from "react";
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useFetch( url,method,customer,actionType,navigateTo = "/" ) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  let fetchOptions;
  if (method === "GET" || method === "DELETE") {
    fetchOptions = {
      method,
      headers: { Authorization: `Bearer ${user.token}` },
    };
  } else {
    fetchOptions = {
      method,
      customer: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  const executeFetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log("json", json);

    if (!response.ok) {
      setLoading(false);
      setError(true);
    }
    if (response.ok) {
      console.log("if (response.ok)===>", json);
      dispatch({ type: actionType, payload: json });
      setLoading(false);
      setError(null);
      navigate(navigateTo);
    }
  },[url,method]);

  return { loading, error, setError, executeFetch };
}
