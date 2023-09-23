import React, { useState } from "react";
import ChatData from "../../ChatAPI/ChatData";
// import ChatCount from "./ChatCount";
import ChatElement from "./ChatElement";

const ChatWindow = () => {
  const [comment, setComment] = useState("");
  const [chats, setChats] = useState(ChatData);
  const AddComment = () => {
    const currentChats = [...chats];
    if (comment !== "") {
      currentChats.push({
        id: crypto.randomUUID(),
        date: "March 25, 2023",
        message: comment,
        replys: [],
        parent: null
      });
      setChats(currentChats);
      setComment("");
    }
  };
  const editComment = (id, newMessage) => {
    const currentChat = [...chats];
    currentChat.map((chat) => {
      if (chat.id === id) {
        chat.message = newMessage;
      }
      return chat;
    });
    setChats(currentChat);
  };
  const addReply = (id, newReply) => {
    let currentChat = [...chats];
    currentChat = currentChat.map((chat) => {
      if (chat.id === id) {
        chat.replys.unshift(newReply.id);
      }
      return chat;
    });
    currentChat.unshift(newReply);
    setChats(currentChat);
  };
  const deleteComment = (chatToDelete) => {
    let currentChat = [...chats];
    const deleteNestedChats = (chatToDelete) => {
      let filterdChat = currentChat.filter((chat) =>
        chatToDelete.replys.includes(chat.id)
      );
      filterdChat.forEach((chat) => {
        deleteNestedChats(chat);
      });
      if (chatToDelete.replys.length === 0) {
        currentChat.map((chat) => {
          if (chat.id === chatToDelete.parent) {
            chat.replys = chat.replys.filter((id) => id !== chatToDelete.id);
          }
          return chat;
        });
        currentChat = currentChat.filter((chat) => chat.id !== chatToDelete.id);
      }
    };
    deleteNestedChats(chatToDelete);
    setChats(currentChat);
  };

  return (
    <>
      <div className="center">
        <input
          className="commentBox"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment..."
        />
        <button className="commentButton" onClick={AddComment}>
          Add Comment
        </button>
      </div>
      {/* <ChatCount Count={chats.length} /> */}
      <div className="chatSection">
        {chats
          .filter((chat) => chat.parent === null)
          .map((chat) => {
            return (
              <>
                <div className="chatElement">
                  <ChatElement
                    Chat={chat}
                    ChatList={chats}
                    DeleteChat={deleteComment}
                    AddReply={addReply}
                    EditComment={editComment}
                  />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default ChatWindow;
