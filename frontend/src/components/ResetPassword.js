import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const { _id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/reset-password/${_id}/${token}`, {
      method: JSON.stringify(otp, password),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp">
              <strong>OTP</strong>
            </label>
            <input
              type="otp"
              placeholder="Enter otp"
              autoComplete="off"
              name="otp"
              className="form-control rounded-0"
              onChange={(e) => setOtp(e.target.value)}
            />
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
