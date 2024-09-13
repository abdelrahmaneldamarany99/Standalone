import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCustomersContext } from "../../hooks/useCustomersContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);
  const { user,setUser } = useAuthContext();
  const { customers, setCustomers } = useCustomersContext();

  
  const handleSignOut = () => {
    setCookie("token", "");
    window.localStorage.removeItem("adminId");
    // window.location.reload(false)
    // dispatch({type:"LOGOUT"})
    setUser(null)
    dispatchCustomers({type:"GET_CUSTOMERS",payload:[]})
    navigate("login");
  };
  
  return (
    <header>
      <div className="container">
        <h1>Standalone App</h1>
        {user && <button className="signout_btn" onClick={handleSignOut}>Sign out</button>}
      </div>
    </header>
  );
};

export default Navbar;
