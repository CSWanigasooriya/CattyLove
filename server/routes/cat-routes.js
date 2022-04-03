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

catRoutes.route("/api/cats/:cid").get(async (req, res) => {
    try {
        const cat = await Cat.findOne(
            {
                cid: req.params.cid
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
            cid: req.body.cid,
            displayName: req.body.displayName,
            gender: req.body.gender,
            description: req.body.description,
            photoUrl: req.body.photoUrl,
        });
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


catRoutes.route("/api/cats/:cid/like").post(async (req, res) => {
    try {
        const cat = await Cat.findOneAndUpdate(
            {
                cid: req.params.cid
            },
            {
                $addToSet: { likedBy: req.body.uid }
            },

        );
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


catRoutes.route("/api/cats/:cid/unlike").post(async (req, res) => {
    try {
        const cat = await Cat.findOneAndUpdate(
            {
                cid: req.params.cid
            },
            {
                $pull: { likedBy: req.body.uid }
            },

        );
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


catRoutes.route("/api/cats/:cid").delete(async (req, res) => {
    try {
        const cat = await Cat.deleteOne({
            id: req.params.cid,
        });
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

catRoutes.route("/api/cats/:cid/comments").get(async (req, res) => {
    try {
        const cat = await Cat.findOne(
            {
                cid: req.params.cid
            },
        );
        res.status(responseCodes.ok).json(cat.comments);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


catRoutes.route("/api/cats/:cid/comments").post(async (req, res) => {
    try {
        const cat = await Cat.findOneAndUpdate(
            {
                cid: req.params.cid
            },
            {
                $addToSet: {
                    comments: {
                        uid: req.body.uid,
                        comment: req.body.comment
                    }
                }
            },

        );
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});


module.exports = catRoutes;