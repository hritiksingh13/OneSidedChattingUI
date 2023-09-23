import React, { useState } from "react";

const ChatElement = ({ Chat, ChatList, DeleteChat, AddReply, EditComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const addReply = () => {
    if (replyComment !== "") {
      const newReply = {
        id: crypto.randomUUID(),
        date: "March 25, 2023",
        message: replyComment,
        replys: [],
        parent: Chat.id
      };
      AddReply(Chat.id, newReply);
    }
    setIsReplying(false);
    setReplyComment("");
  };

  const handleCommentChange = (event) => {
    EditComment(Chat.id, event.target.value);
  };

  return (
    <>
      <div className="column">
        <div className="row1">
          <p>{Chat.date}</p>
          {isEditing ? (
            <>
              <div className="messageContent">
                <input
                  className="messageBox"
                  autoFocus={true}
                  value={Chat.message}
                  onChange={handleCommentChange}
                />
              </div>
            </>
          ) : (
            <p>{Chat.message}</p>
          )}
          {/* <p>{Chat.message}</p> */}
        </div>
        <div className="row2">
          <button className="deleteChat" onClick={() => DeleteChat(Chat)}>
            Delete
          </button>
          <button
            className="editChat"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Done" : "Edit"}
          </button>
          <button
            className="replyChat"
            onClick={() => setIsReplying(!isReplying)}
          >
            {isReplying ? "Cancel" : "Reply"}
          </button>
        </div>
      </div>
      {isReplying ? (
        <>
          <div className="replyElement">
            <input
              className="replyBox"
              value={replyComment}
              autoFocus={true}
              onChange={(e) => setReplyComment(e.target.value)}
            />
            <button className="replyButton" onClick={addReply}>
              Reply
            </button>
          </div>
        </>
      ) : null}
      <div className="reply">
        {ChatList.filter((chat) => Chat.replys.includes(chat.id)).map(
          (chat) => {
            return (
              <>
                <ChatElement
                  Chat={chat}
                  ChatList={ChatList}
                  DeleteChat={DeleteChat}
                  AddReply={AddReply}
                  EditComment={EditComment}
                />
              </>
            );
          }
        )}
      </div>
    </>
  );
};

export default ChatElement;
