const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const catRoutes = express.Router();

const Cat = require("../models/cat.model");

const responseCodes = require("../models/response-codes");

// This section will help you get a list of all the records.
catRoutes.route("/api/cats").get(async (req, res) => {
    try {
        const cat = await Cat.find();
        res.status(responseCodes.ok).json(cat);
    }
    catch (err) {
        res.json({ status: "error", error: err.message });
    }
});

// This section will help you get a single record by id
// GET specific cat
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

// This section will help you create a new record.
// Admin -> create cat post
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


//TODO: delete car by uid
// This section will help you delete a record
// Admin -> DELETE cat post
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