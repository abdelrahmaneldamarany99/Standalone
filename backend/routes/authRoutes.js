const router = require("express");
const router = express.Router();

const { signIn, signUp } = require("../controllers/authControllers");

router.post("/sign_up", signUp);

router.post("/sign_in", signIn);

module.exports = router;
