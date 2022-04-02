const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const authRoutes = express.Router();
require("dotenv").config({ path: "./config.env" });
const jwt = require('jsonwebtoken');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const responseCodes = require("../models/response-codes");
const User = require("../models/user.model");

authRoutes.route("/api/auth/register").post(async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
        });
        res.status(responseCodes.ok).json(user);
    }
    catch (err) {
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
            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password,
            }, process.env.JWT_SECRET);
            res.status(responseCodes.ok).json({ user, token });
        }

    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

module.exports = authRoutes;