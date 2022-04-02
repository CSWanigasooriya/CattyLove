require("dotenv").config({ path: "./config.env" });

const express = require("express");

const catRoutes = express.Router();

const Cat = require("../models/cat.model");

const responseCodes = require("../models/response-codes");

catRoutes.route("/api/cats").get(async (req, res) => {
    try {
        const cat = await Cat.find();
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

catRoutes.route("/api/cats/:id").get(async (req, res) => {
    try {
        const cat = await Cat.findOne(
            {
                id: req.params.id
            }
        );
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


catRoutes.route("/api/cats").post(async (req, res) => {
    try {
        const cat = await Cat.create({
            id: req.body.id,
            displayName: req.body.displayName,
            gender: req.body.gender,
            description: req.body.description,
            photoUrl: req.body.photoUrl,
            likes: req.body.likes,
        });
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


catRoutes.route("/api/cats/:id").delete(async (req, res) => {
    try {
        const cat = await Cat.deleteOne({
            id: req.params.id,
        });
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


module.exports = catRoutes;