import './Note.css'

function Note({ title, text, createTime, updatedDate, category, onDelete, onClick }) {
  return (
    <div
      className={`notes-container category-${category}`}
      onClick={onClick}
    >
      <div className="firstRow">
        <span className="noteCategory">{category}</span>
        <button
          className="deleteNote"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          X
        </button>
      </div>
      <h3 className="noteTitle">{title}</h3>
      <p className="noteText">{text}</p>
      <div className="noteDates">
        <div className="createdLine">Created: {createTime}</div>
        {updatedDate && <div className="updatedLine">Updated: {updatedDate}</div>}
      </div>
    </div>
  )
}

export default Note
