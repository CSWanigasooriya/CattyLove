const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const catRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const responseCodes = require("../models/response-codes");

// This section will help you get a list of all the records.
catRoutes.route("/api/cats").get(function (req, res) {
    let db_connect = dbo.getDb("cattylovedb");
    db_connect
        .collection("cats")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.status(responseCodes.ok).json(result);
        });
});

// This section will help you get a single record by id
// GET specific cat
catRoutes.route("/api/cats/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { uid: req.params.id };
    db_connect
        .collection("cats")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.status(responseCodes.ok).json(result);
        });
});

// This section will help you create a new record.
// Admin -> create cat post
catRoutes.route("/api/cats/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        uid: req.body.uid,
        displayName: req.body.displayName,
        gender: req.body.gender,
        description: req.body.description,
        likes: req.body.likes,
        photoURL: req.body.photoURL,
    };
    db_connect.collection("cats").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.status(responseCodes.ok).json(res);
    });
});

//FIXME: Fix cat not updating issues.
// This section will help you update a record by id.
catRoutes.route("/api/cats/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { uid: req.params.uid };
    let newvalues = {
        $set: {
            displayName: req.body.displayName,
            gender: req.body.gender,
            description: req.body.description,
            likes: req.body.likes,
            photoURL: req.body.photoURL,
        },
    };
    db_connect
        .collection("cats")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.status(responseCodes.ok).json(res);
        });
});


//TODO: delete car by uid
// This section will help you delete a record
// Admin -> DELETE cat post
catRoutes.route("/api/cats/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("cats").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(responseCodes.ok).json(obj);
    });
});

module.exports = catRoutes;