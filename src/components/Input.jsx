import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./Input.css";

function Input({ updateFunction }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Study");

  const handleAddNote = () => {
    if (!title.trim() && !text.trim()) return;

    updateFunction({
      title,
      text,
      category,
      createTime: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }),
    });

    setTitle("");
    setText("");
    setCategory("Study");
  };

  return (
    <div className="main-container">
      <input
        className="noteTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
      />

      <TextareaAutosize
        className="noteText"
        minRows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your note..."
      />

      <select
        className="noteCategorySelect"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Study">Study</option>
        <option value="Leet">Leet</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>

      <button className="addNote-button" onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  );
}

export default Input;
