import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please fill in all fields"));
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });

    newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
