const express = require("express");
const Router = express.Router();
const User = require("./users.model"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

Router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", err });
  }
});

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const secret = "jwt";
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", err });
  }
});

module.exports = Router;