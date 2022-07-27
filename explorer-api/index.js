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

// These are our 'endpoints'
app.get("/trip", getTrip); //Get latitude/longitude
app.put("/trip/:id", putTrip);
app.post("/trip", postTrip);

app.get("/notes", getNotes);
app.post("/notes", postNotes);
app.put("/notes/:id", putNotes);
app.delete("/notes/:id", deleteNotes);

// Request
async function getTrip(request, response, next) {
  const { location } = request.query;
  console.log(location);
  verifyUser(request, async (err, user) => {
    console.log(verifyUser);
    if (err) {
      response.send((err.message, "Invalid token"));
    } else {
      trip(location)
        .then((summaries) => response.send(summaries))
        .catch((error) => {
          console.error(error.message);
          response.status(200).send("getTrip function is NOT functioning.");
        });
    }
  });
}
///LOCAL TEST FUNCTION : Use http://localhost:3001/all?location=miami in Thunderclient
app.get("/all", getAll);
// This function will 'get' data from the api database.
async function getAll(request, response, next) {
  const { location } = request.query;
  console.log(location);

  trip(location)
    .then((summaries) => response.send(summaries))
    .catch((error) => {
      console.error(error.message);
      response.status(200).send("getTrip function is functioning.");
    });
}

async function getNotes(request, response, next) {
  try {
    let results = await Notes.find();
    response.status(200).send(results);
  } catch (err) {
    next(err);
  }
}

// Create
async function postTrip(request, response, next) {
  console.log(request.body);
  try {
    let createdTrip = await Notes.create(request.body);
    response.status(200).send(createdTrip);
  } catch (error) {
    next(error);
  }
}

async function postNotes(request, response, next) {
  try {
    let createNote = await Notes.create(request.body);
    response.status(200).send(createNote);
  } catch (err) {
    next(err);
  }
}

// Update
async function putTrip(request, response, next) {
  try {
    let id = request.params.id;
    let updatedTrip = await trip.findByIdAndUpdate(id, request.body, {
      new: true,
      overwrite: true,
    });
    response.status(200).send(updatedTrip);
  } catch (error) {
    next(error);
  }
}

async function putNotes(request, response, next) {
  try {
    let id = request.params.id;
    let updatedNotes = await Notes.findByIdAndUpdate(id, request.body, {
      new: true,
      overwrite: true,
    });
    response.status(200).send(updatedNotes);
  } catch (error) {
    next(error);
  }
}

// Delete
app.delete("/trip/:id", deleteTrip);
async function deleteTrip(request, response, next) {
  try {
    let id = request.params.id;
    console.log(request.params.id);
    await trip.findByIdAndDelete(id);
    response.status(200).send("trip was deleted");
  } catch (error) {
    next(error);
  }
}

async function deleteNotes(request, response, next) {
  try {
    let id = request.params.id;
    console.log(id);
    await Notes.findByIdAndDelete(id);
    response.status(200).send("Notes were deleted");
  } catch (err) {
    next(err);
  }
}

app.listen(port, () => {});
