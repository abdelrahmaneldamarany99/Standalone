const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!/^[a-z_]{3,}@[a-z_]{2,4}\.[a-zA-Z]{2,}$/gi.test(email)) {
    return res.status(400).json({ message: "invalid email" });
  }

  if (!/[A-Z]+\d+[~!#%\^&\*]+/g.test(password) || password.trim().length < 8) {
    return res.status(400).json({ message: "invalid password" });
  }

  const emailExists = await UserModel.findOne({ email });

  if (emailExists) {
    return res.status(400).json({ message: "email already in use" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const admin = await UserModel.create({ email, password: hashedPassword });
    res.status(200).json({email,token});
  } catch (error) {
    res
      .status(404)
      .json({ message: "data couldn't be saved,please try again later" });
  }  
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

//_____________________________________________________

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const generatedOtp = Math.floor(Math.random() * 10000);
    var transporter = nodemailer.createTransport({
      host: "gmail",
      port: 2525,
      auth: {
        user: "youremail@gmail.com",
        pass: "your password",
      },
    });
    let mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "New OTP Generated",
      html: `<p>OTP is : ${generatedOtp}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.messagId) {
      const user = await UserModel.findByIdAndUpdate(
        { otp },
        { password: hashedPassword, otp: 0 },
        { new: true }
      );
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    return res.status(404).json({ message: "OTP Sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const forgotPassword = (req, res) => {
//   const { email } = req.body;
//   UserModel.findOne({ email: email }).then((user) => {
//     if (!user) {
//       return res.send({ Status: "User not existed" });
//     }
//     const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
//       expiresIn: "1d",
//     });
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "youremail@gmail.com",
//         pass: "your password",
//       },
//     });

//     var mailOptions = {
//       from: "youremail@gmail.com",
//       to: "user email@gmail.com",
//       subject: "Reset Password Link",
//       text: `http://localhost:5173/reset_password/${user._id}/${token}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.send({ Status: "Success" });
//       }
//     });
//   });
// };

//_____________________________________________________

const resetPassword = async (req, res) => {
  const { password, otp } = req.body;

  try {
    const user = await UserModel.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await UserModel.findByIdAndUpdate(
      { otp },
      { password: hashedPassword, otp: 0 },
      { new: true }
    );
    return res.status(404).json({ message: "Password UPDATED Sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const resetPassword = (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//     if (err) {
//       return res.json({ Status: "Error with token" });
//     } else {
//       bcrypt
//         .hash(password, 10)
//         .then((hash) => {
//           UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
//             .then((u) => res.send({ Status: "Success" }))
//             .catch((err) => res.send({ Status: err }));
//         })
//         .catch((err) => res.send({ Status: err }));
//     }
//   });
// };

module.export = {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
};
