require("dotenv").config({ path: "./config.env" });

const express = require("express");

const userRoutes = express.Router();

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");
const Cat = require("../models/cat.model");

const mongoose = require("mongoose");

userRoutes.route("/api/users").get(async (req, res) => {
  try {
    const user = await User.find();
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

userRoutes.route("/api/users/:id").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

userRoutes.route("/api/users/:id/wishlist").get(async (req, res) => {
  try {
    const cats = await Cat.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "cid",
          foreignField: "wishlist",
          as: "wishlist",
        },
      },
    ]);

    res.status(responseCodes.ok).json(cats);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

userRoutes.route("/api/users/:id/wishlist").post(async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
        wishlist: { $ne: req.body.cid },
      },
      {
        $addToSet: { wishlist: req.body.cid },
      }
    );
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

userRoutes.route("/api/users/:id/wishlist/:cid").delete(async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        $pull: { wishlist: req.params.cid },
      }
    );
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

module.exports = userRoutes;
