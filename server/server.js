const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const swagger = require("./swagger");


require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;

// get driver connection
// const dbo = require("./db/conn");

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(require("./routes/user-routes"));
app.use(require("./routes/cat-routes"));
app.use(require("./routes/auth-routes"));

swagger(app);

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      // perform a database connection when server starts
      // dbo.connectToServer(function (err) {
      //     if (err) console.error(err);

      // });
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
