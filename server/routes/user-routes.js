const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/user").get(function (req, res) {
    let db_connect = dbo.getDb("cattylovedb");
    db_connect
        .collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/user/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { uid: req.params.id };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/user/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        uid: req.body.uid,
        displayName: req.body.displayName,
        lastLogin: req.body.lastLogin,
        photoURL: req.body.photoURL,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//FIXME: Fix user not updating issues.
// This section will help you update a record by id.
recordRoutes.route("/user/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { uid: req.params.uid };
    let newvalues = {
        $set: {
            displayName: req.body.displayName
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});


//TODO: delete user by uid
// This section will help you delete a record
recordRoutes.route("/user/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;