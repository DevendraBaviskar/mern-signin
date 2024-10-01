const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res
    .status(200)
    .send(`<h1>${"Welcome to home page this is from backend"}</h1>`);
});

router.post("/signup", async (req, res) => {
  const { fullname, email } = req.body;
  if (!fullname || !email) {
    return res.status(400).json({ error: "Required all the fields!" });
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    console.log("User is already exist");
    return res.status(400).json({ msg: "Please go to login page" });
  }
  try {
    const user = await User.create({ fullname, email });
    res.status(201).json({ msg: "User created successfully" });
    console.log(user);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: "From the post route" });
  }
});

module.exports = router;
