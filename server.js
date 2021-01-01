//IMPORTING
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
//APP CONFIG
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1113403",
  key: "952086fa7fedf08d2f11",
  secret: "ebae76bfb740f0001b9d",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Eror triggering Pusher");
    }
  });
});
//MIDDLE WARES
app.use(express.json());
app.use(cors());
//DB CONFIG
const connection_Url =
  "mongodb+srv://admin:MsgIng@cluster0.p2hmi.mongodb.net/msgingdb?retryWrites=true&w=majority";
mongoose.connect(connection_Url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//???

//API ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500), send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//LISTENER
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
