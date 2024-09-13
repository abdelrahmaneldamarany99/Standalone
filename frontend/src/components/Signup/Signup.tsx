import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fields, setFields] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [_, setCookie] = useCookies(["token"]);
  const { dispatch } = useAuthContext();
  const url = "http://localhost:5173";
  type Event = {
    preventDefault: () => void;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setClicked(true);
    setIsLoading(true);
    setError(null);

    if (email.trim() && password.trim() && password === confirmPassword) {
      axios
        .post(`/api/user/signup`, { email, password })
        .then((res) => {
          console.log(res);
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
          setError(error);
          setIsLoading(false);
        });
    } else {
      setFields(true);
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

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
        <label>Confirm Password:</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {clicked &&
          password.trim() &&
          confirmPassword.trim() &&
          password !== confirmPassword && (
            <div>Your input does not match the password</div>
          )}

        <button disabled={isLoading}>Sign up</button>

        {/* {!(email.trim() && password.trim() && confirmPassword.trim()) &&
          password !== confirmPassword && (
            <div>
              Please fill all fields and match password to enable the button
            </div>
          )} */}
        {/* disabled={isLoading} */}

        {error && <div className="error">Someting went wrong : {error}</div>}

        {clicked &&
          confirmPassword !== password &&
          !(email.trim() || password.trim()) && (
            <div>
              Please fill all fields and match password to enable the button
            </div>
          )}
      </form>
      <div>
        Already have account ? <Link to="/signin">Sign in</Link>
      </div>
    </>
  );
};

export default Signup;
