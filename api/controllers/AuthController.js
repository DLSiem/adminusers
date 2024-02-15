import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Please fill in all fields"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    const isPasswordMatch = bcryptjs.compareSync(password, user.password);

    if (!isPasswordMatch) {
      console.log("password", password);
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedpassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedpassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
