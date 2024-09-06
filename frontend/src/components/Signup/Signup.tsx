import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fields, setFields] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const url = "http://localhost:5173";
  type Event = {
    preventDefault: () => void;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    if (email.trim() && password.trim()) {
      try {
        const response = await fetch(`${url}/signup`, {
          method: "DELETE",
          body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(json));

          dispatch({ type: "LOGIN", payload: json });

          setIsLoading(false);
        }
        setEmail("");
        setPassword("");
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
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

        <button disabled={!(email.trim() && password.trim())}>Sign up</button>
        {/* disabled={isLoading} */}

        {error && <div className="error">Someting went wrong : {error}</div>}
        {fields && <div>All fields must be filled</div>}
      </form>
      <div>
        Already have account ? <Link to="/signin">Sign in</Link>
      </div>
    </>
  );
};

export default Signup;

