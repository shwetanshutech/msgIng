import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
function SidebarChat({ addNewChat }) {
  //to set different avatar everytime the feed loads up
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter the name for Chat");
    if (roomName) {
      //do some clever database stuff here
    }
  };
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat_info">
        <h2>Room Name</h2>
        <p>This will be the last msg</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add new Chat</h3>
    </div>
  );
}

export default SidebarChat;
