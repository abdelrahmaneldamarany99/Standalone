import { useState, useContext } from "react";
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useFetch(
  url,
  method = "GET",
  body,
  dispatchType,
  route = "/"
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const executeFetch = async () => {
    let response
    if (method !== "GET") {
      response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } else {
      response = await fetch(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setData(null);
      setLoading(false);
      setError(true);
      console.log(error);
    }
    if (response.ok) {
      setData(json);
      setLoading(false);
      setError(false);
      dispatch({ type: dispatchType, payload: json });
      navigate(route);
    }
  };

  return { data, loading, error, setError, executeFetch };
}
