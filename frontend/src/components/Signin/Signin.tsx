// //@ts-nocheck
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const [_, setCookie] = useCookies(["token"]);
  // const url = "http://localhost:5173";

  type Event = {
    preventDefault: () => void;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    if (email.trim() && password.trim()) {
      axios
        .post(`/api/user/signin`, { email, password })
        .then((res) => {
          setCookie("token", res.data.token);
          window.localStorage.setItem("user", res.data.adminId);
          // window.location.reload(false)
          dispatch({ type: "LOGIN", payload: res.data });
          setIsLoading(false);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          // console.log(error);
          setError(true);
          setIsLoading(false);
        });
    } else {
      setFields(true);
    }
  };
  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={!(email.trim() && password.trim())}>Sign in</button>
        {/* disabled={isLoading} */}
        <br />
        <br />
        <Link to="/forgot-password">Forgot Password ?</Link>
        {error && <div className="error">Someting went wrong : {error}</div>}
        <br />
        {fields && <div>All fields must be filled</div>}
      </form>
      <div>
        Don't have account ? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Signin;
