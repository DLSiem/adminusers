import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
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

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
