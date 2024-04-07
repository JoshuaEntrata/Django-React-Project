import { useState, useEffect, FormEvent } from "react";
import api from "../api/api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

type NoteProps = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data as NoteProps[])
      .then((data) => {
        setNotes(data);
        console.log("data: ", data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id: string) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        res.status === 204
          ? alert("Note deleted")
          : alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e: FormEvent) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        res.status === 201
          ? alert("Note created")
          : alert("Failed to create note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div>
        <p onClick={() => navigate("/logout")}>Logout</p>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
}

export default Home;
