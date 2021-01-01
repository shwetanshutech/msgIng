import "./App.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
function App() {
  const [messages, setMessages] = useState([]);

  //for fetching all of the intial information
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("952086fa7fedf08d2f11", {
      cluster: "ap2",
    });
    //listener
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    //the cleanup function
    return () => {
      //unbind and unsubscribe all ,even  when msgs changes we ensure we have only one subscriber
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        {/* Sidebar */}
        <Sidebar />
        <Chat messages={messages} />
        {/* Chat */}
      </div>
    </div>
  );
}

export default App;
