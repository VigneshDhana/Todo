require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://instaclone:insta@test.vrl4wrj.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello World");
});

app.post("/register", async (req, res) => {
  try {
    let users = await user.find({ username: req.body.username });
    if (users[0]) {
      res.send({
        message: "User Already Exist",
      });
    } else {
      await user.create(req.body);
      res.send({
        message: "User Created",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    let users = await user.find({ username: req.body.username });
    if (users[0]) {
      if (users[0]["password"] === req.body.password) {
        res.send(users[0]);
      } else {
        res.send({
          message: "Invalid Password",
        });
      }
    } else {
      res.send({
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/update", async (req, res) => {
  try {
    let users = await user.find({ username: req.body.username });
    await user.updateOne(
      { username: req.body.username },
      { ...users, data: req.body.data }
    );
    res.send({ message: "updated successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.listen(port, () => console.log(`server running on port ${port}`));
