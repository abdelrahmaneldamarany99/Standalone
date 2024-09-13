// import { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Customers from "./components/Customers/Customers";
import UpdateCustomer from "./components/UpdateCustomer/UpdateCustomer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { useAuthContext } from "./hooks/useAuthContext";

// const Home = lazy(() => import("./components/Home/Home"));
// const Customers = lazy(() => import("./components/Customers/Customers"));
// const UpdateCustomer = lazy(
//   () => import("./components/UpdateCustomer/UpdateCustomer")
// );

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            {/* <Suspense fallback={<h1>Loading...</h1>}> */}
            {/* <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={!user ? <Signin /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            /> */}
            <Route path="/updatecustomer/:_id" element={<UpdateCustomer />} />
            <Route path="/customers" element={<Customers />} />
            {/* </Suspense> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
