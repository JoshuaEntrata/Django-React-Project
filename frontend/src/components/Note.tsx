import "../styles/Note.css";

type NoteProps = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

type Props = {
  note: NoteProps;
  onDelete: (id: string) => void;
};

function Note({ note, onDelete }: Props) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <>
      <div className="note-container">
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </>
  );
}

export default Note;
