require("dotenv").config({ path: "./config.env" });

const express = require("express");

const userRoutes = express.Router();

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");


userRoutes.route("/api/users").get(function (req, res) {

});

userRoutes.route("/api/users/:id").get(function (req, res) {

});

userRoutes.route("/api/users/add").post(function (req, response) {

});

userRoutes.route("/api/users/:id").delete((req, response) => {

});

module.exports = userRoutes;