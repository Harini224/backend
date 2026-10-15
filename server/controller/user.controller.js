import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    //basic validation
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    //create new user
    const newUser = await User.create({
      username,
      password,
      email: email.toLowerCase(),
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

    //log the user in after registration
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("body", req.body);
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    // console.log("user", user);
    // console.log("stored hash", user?.password);
    // console.log(
      // "match: ",
      // user && (await bcrypt.compare(req.body.password, user.password)),
    // );
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //compare the provided password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //update the user's loggedIn status
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // console.log("login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("logout error:", error);
    res.status(500).json({ message: "Internal server error" })
  }
};

export { registerUser, loginUser, logoutUser };
