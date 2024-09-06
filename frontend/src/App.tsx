import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
