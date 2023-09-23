const ChatData = [
  {
    id: "1",
    message: "first comment",
    date: "March 25, 2023",
    replys: ["2"],
    parent: null
  },
  {
    id: "2",
    message: "second comment: first comment reply",
    date: "March 25, 2023",
    replys: ["3"],
    parent: "1"
  },
  {
    id: "3",
    message: "second comment reply",
    date: "March 25, 2023",
    replys: [],
    parent: "2"
  },
  {
    id: "4",
    message: "second comment",
    date: "March 25, 2023",
    replys: [],
    parent: null
  }
];

export default ChatData;
