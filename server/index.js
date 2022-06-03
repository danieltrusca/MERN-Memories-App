const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// load env variables
const dotenv = require("dotenv");
dotenv.config();

// import routes
const postRotes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// routes
app.use("/api/posts", postRotes);
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
      app.listen(PORT, () =>
        console.log(`Server Running on Port: http://localhost:${PORT}`)
       );
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
