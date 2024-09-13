const router = require("express");
const router = express.Router();

const {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers");

router.post("/signup", signUp);

router.post("/signin", signIn);

app.post("/forgot-password", forgotPassword);

app.post("/reset-password/:id/:token", resetPassword);

module.exports = router;
