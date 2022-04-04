require("dotenv").config({ path: "./config.env" });

const express = require("express");

const userRoutes = express.Router();

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");


userRoutes.route("/api/users").get(async (req, res) => {
    try {
        const user = await User.find();
        res.status(responseCodes.ok).json(user);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

userRoutes.route("/api/users/:uid").get(async (req, res) => {
    try {
        const user = await User.findOne(
            {
                uid: req.params.uid
            }
        );
        res.status(responseCodes.ok).json(user);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

userRoutes.route("/api/users/:uid/wishlist/add").post(async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.uid
            },
            {
                $addToSet: { wishlist: req.body.cid }
            }
        );
        res.status(responseCodes.ok).json(user);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

userRoutes.route("/api/users/:uid/wishlist/remove").post(async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.uid
            },
            {
                $pull: { wishlist: req.body.cid }
            },

        );
        res.status(responseCodes.ok).json(user);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

userRoutes.route("/api/users/:uid/wishlist").get(async (req, res) => {
    try {
        const user = await User.findOne(
            {
                _id: req.params.uid
            }
        );
        res.status(responseCodes.ok).json(user.wishlist);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

module.exports = userRoutes;