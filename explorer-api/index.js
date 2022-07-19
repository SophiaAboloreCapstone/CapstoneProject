const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Parse = require("parse/node");
const { PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, MASTER_KEY } = require("./config");
const { query } = require("express");
const { Schema } = require("parse/node");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, MASTER_KEY);
// Parse.initialize(appConfig.parse.PARSE_APP_ID);
// Parse.masterKey = appConfig.parse.masterKey;
Parse.serverURL = "https://parseapi.back4app.com";

app.post("/register", async (req, res) => {
  // Create a Parse class called User
  let user = new Parse.User(req.body);

  try {
    await user.signUp();
    res.status(201);
    res.send({ user: user });
  } catch (error) {
    res.status(400);
    res.send({ error: "Failed to create user: " + error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password);
    res.send({ user: user });
  } catch (error) {
    res.status(400);
    res.send({ error: "Login failed: " + error });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const query = new Parse.Query("Messages");

    query.descending("createdAt");
    query.include("user");

    messages = await query.find();

    res.send({ messages: messages });
  } catch (error) {
    res.status(400);
    res.send({ error: "Message query failed: " + error });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const message = new Parse.Object("Messages", req.body);

    currentUserId = req.headers["current_user_id"];
    const user = new Parse.User();
    user.id = currentUserId;

    message.set("user", user);

    await message.save();
    res.status(201);
    res.send({ message: message });
  } catch (error) {
    res.status(400);
    res.send({ error: "Create message failed: " + error });
  }
});

// Profile Information

app.post("/profileInfo", async (req, res) => {
  try {
    const profile = new Parse.Object("ProfileInfo", req.body);

    currentUserId = req.headers["current_user_id"];
    const user = new Parse.User();
    user.id = currentUserId;

    profile.set("user", user);

    await profile.save(); //(null, { useMasterKey: true });
    res.status(201);
    res.send({ profile: profile });
  } catch (error) {
    res.status(400);
    res.send({ error: "Sorry, this profile couldn't be created " + error });
  }
});

app.get("/profileInfo", async (req, res) => {
  try {
    const query = new Parse.Query("ProfileInfo");

    query.descending("createdAt");
    query.include("user");

    profileInfo = await query.find();
    res.send({ profileInfo: profileInfo });
  } catch (error) {
    res.status(400);
    res.send({ error: "Sorry, this profile couldn't be retrieved: " + error });
  }
});

// matches Information
app.get("/matches", async (req, res) => {
  try {
    const query = new Parse.Query("ProfileInfo");
    // query.include("user");
    query.descending("createdAt");
    query.include("user");

    profiles = await query.find();

    res.send({ profiles: profiles });
  } catch (error) {
    res.status(400);
    res.send({ error: "Profile query failed: " + error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {});
