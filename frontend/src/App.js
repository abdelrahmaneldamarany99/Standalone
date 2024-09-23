import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import PageNotFound from "./components/PageNotFound";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import SuspendedHome from "./pages/SuspendedHome";
// import UpdateCustomer from "./pages/UpdateCustomer";
import SuspendedUpdateCustomer from "./pages/SuspendedUpdateCustomer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:_id/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/"
              element={user ? <SuspendedHome /> : <Navigate to="/signin" />}
            />
            <Route
              path="/home"
              element={user ? <SuspendedHome /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={!user ? <Signin /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/updatecustomer/:_id"
              element={<SuspendedUpdateCustomer />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
