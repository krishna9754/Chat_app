import React, { useEffect, useState } from "react";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";

const ChatContainer = () => {

  const [user, setUser] = useState(localStorage.getItem("user"));
  const socketio = socketIOClient("http://localhost:4500");
  const [chats, setChats] = useState([]);

  useEffect(() => {

    socketio.on("chat", (chats) => {
      setChats(chats);
    });

    socketio.on('message', (msg) => {
      setChats((prevChats) => [...prevChats, msg])
    })

    return () => {
      socketio.off('chat')
      socketio.off('message')
    }
  }, []);

  const sendToSocket = (chat) => {
    socketio.emit('chat', chat)
  }

  const addMessage = (chat) => {
    const newChat = {
      message: chat,
      user: localStorage.getItem('user'),
      avatar: localStorage.getItem('avatar'),
    };
    // socketio.emit('newMessage', newChat)
    setChats([...chats, newChat])
    sendToSocket([...chats, newChat]);
  };

  const Logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem('avatar')
    setUser('')
  }

  return (
    <div>
      {
        user ?
          (
            <div style={{ height: "100vh" }}>
              <div className="chats_header">
                <h4>Username: {user}</h4>
                <p className="chats_logout" onClick={Logout}>
                  <strong>Logout</strong>
                </p>
              </div>
              <ChatLists chats={chats} />
              <InputText addMessage={addMessage} />
            </div>
          )
          : (
            <UserLogin setUser={setUser} />
          )}
    </div>
  );
};

export default ChatContainer;