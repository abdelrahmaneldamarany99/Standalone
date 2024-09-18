import {
  useState,
  useContext,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { CustomersContext } from "../context/CustomersContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useFetch(
  url,
  method = "GET",
  body,
  actionType,
  navigateTo = "/"
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(CustomersContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchOptions =
    method === "GET"
      ? {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      : {
          method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

  /*
  * Here's an alternative technique to useReducer hook :
  First step of the alternative technique to useReducer hook
  // const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();
  */

  const executeFetch = useCallback(async () => {
    const response = await fetch(url, fetchOptions);

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      // setData(null);
      setLoading(false);
      setError(true);
      console.log(error);
    }
    if (response.ok) {
      setLoading(false);
      setError(false);
      dispatch({ type: actionType, payload: json });

      // Second step of an alternative technique to useReducer hook
      // startTransition(()=>setData(json))

      navigate(navigateTo);
    }
  }, []);

  return { loading, error, setError, executeFetch };
  // "data" state and "isPending" should be included  in case of using useState and useTransition hooks
}
