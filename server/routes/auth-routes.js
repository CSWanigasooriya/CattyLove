require("dotenv").config({ path: "./config.env" });

const express = require("express");

const authRoutes = express.Router();

const jwt = require("jsonwebtoken");

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");

authRoutes.route("/api/auth/register").post(async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

authRoutes.route("/api/auth/login").post(async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          uid: user._id,
          email: req.body.email,
          password: req.body.password,
        },
        process.env.JWT_SECRET
      );
      res.status(responseCodes.ok).json({ uid: user._id, token });
    } else {
      res
        .status(responseCodes.unauthorized)
        .json({
          errorMessage: "Incorrect email or password, Please try again.",
        });
    }
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

module.exports = authRoutes;
