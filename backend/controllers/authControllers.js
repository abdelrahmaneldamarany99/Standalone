const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!/^[a-zA-Z_]{3,}@[a-zA-Z_]{2,4}\.[a-zA-Z]{2,}$/g.test(email)) {
    return res.status(400).json({ message: "invalid email" });
  }

  if (!/[A-Z]+\d+[~!#%\^&\*]+/g.test(password) || password.length < 8) {
    return res.status(400).json({ message: "invalid password" });
  }
  const exist = await UserModel.findOne({ email });

  if (email) {
    return res.status(400).json({ message: "email already in use" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await UserModel.create({ email, password: hashedPassword });

  if (!admin) {
    return res
      .status(404)
      .json({ message: "data couldn't be saved,please try again later" });
  }

  res.status(200).json(admin);
};
//_____________________________________________________

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ message: "all fields must be filled" });
  }

  const admin = await UserModel.findOne({ email });

  if (!admin) {
    return res.status(400).json({ message: "email not found" });
  }

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    return res.status(400).json({ message: "email or password not correct" });
  }

  const token = jwt.sign({ _id: admin.id }, process.env.SECRET);

  res.status(200).json({ token, adminId: admin.id });
};

module.export = {
  signIn,
  signUp,
};
