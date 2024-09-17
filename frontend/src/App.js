import { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import PageNotFound from "./components/PageNotFound";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UpdateCustomer from "./pages/UpdateCustomer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

// lazy loading
// const Home = lazy(() => import("./pages/Home.js"));
// const UpdateCustomer = lazy(() => import("./pages/UpdateCustomer.js"));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* alternative routes - no user state or lazy loading concept */}
            {/* <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/updatecustomer/:_id" element={<UpdateCustomer />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:_id/:token"
              element={<ResetPassword />}
            />
             */}

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:_id/:token"
              element={<ResetPassword />}
            />

            {/* lazy loading */}
            {/* <Suspense fallback={<h1>Loading...</h1>}> */}
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/signin" />}
            />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
            <Route
              path="/signin"
              element={!user ? <Signin /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/updatecustomer/:_id" element={<UpdateCustomer />} />
            {/* </Suspense> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
