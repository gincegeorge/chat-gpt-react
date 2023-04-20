import { useState } from "react";
import "./App.css";
import send from "./assets/send.svg";
import user from "./assets/user.png";
import bot from "./assets/bot.png";
import loadingIcon from "./assets/loader.svg";

let arr = [
  { type: "user", text: "thsi is a quetion" },
  { type: "bot", text: "this is an answer" },
];

function App() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState(arr);

  const handleSubmit = () => {
    if (input.trim() === "") return;
    updatePosts(input);
    setInput("");
  };

  const onKeyUP = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      handleSubmit();
    }
  };

  const updatePosts = (post) => {
    setPosts((prevState) => {
      return [...prevState, { type: "user", text: post }];
    });
  };

  return (
    <main className="chatGPT-app">
      <section className="chat-container">
        <div className="layout">
          {posts.map((post, index) => {
            return (
              <div
                key={index}
                className={`chat-bubble ${
                  post.type === "bot" || post.type === "loading" ? "bot" : ""
                }`}
              >
                <div className="avatar">
                  <img
                    src={
                      post.type === "bot" || post.type === "loading"
                        ? bot
                        : user
                    }
                  />
                </div>
                {post.type === "loading" ? (
                  <div className="loader">
                    <img src={loadingIcon} />
                  </div>
                ) : (
                  <div key={index} className="post">
                    {post?.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <footer>
        <input
          className="composebar"
          autoFocus
          type="text"
          placeholder="Ask anything!"
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={onKeyUP}
          value={input}
        />
        <div className="send-button" onClick={handleSubmit}>
          <img src={send} />
        </div>
      </footer>
    </main>
  );
}

export default App;
