import { useState, useEffect } from 'react'
import './Dashboard.css'
import Input from './Input'
import Note from './Note'
import { Modal, Button } from '@mantine/core'
import TextareaAutosize from 'react-textarea-autosize'

const categories = [
  { name: 'Personal', color: '#ffe4e1' },
  { name: 'Work', color: '#e0f7fa' },
  { name: 'Ideas', color: '#fff9c4' },
  { name: 'Other', color: '#f3e5f5' }
]

function Dashboard() {
  const [notes, updateNotes] = useState([])
  const [nextId, setNextId] = useState(1)
  const [selectedNote, setSelectedNote] = useState(null)

  const [editTitle, setEditTitle] = useState('')
  const [editText, setEditText] = useState('')
  const [editCategory, setEditCategory] = useState(categories[0].name)

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      const parsed = JSON.parse(storedNotes)
      updateNotes(parsed)
      if (parsed.length > 0) {
        setNextId(Math.max(...parsed.map(n => n.id)) + 1)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (newNote) => {
    const categoryObj = categories.find(c => c.name === newNote.category) || categories[0]
    const newData = [
      { ...newNote, id: nextId, categoryColor: categoryObj.color },
      ...notes
    ]
    updateNotes(newData)
    setNextId(n => n + 1)
  }

  const removeNote = (id) => {
    updateNotes(prev => prev.filter(n => n.id !== id))
    if (selectedNote?.id === id) setSelectedNote(null)
  }

  const formatNow = () =>
    new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })

  const openModal = (note) => {
    setSelectedNote(note)
    setEditTitle(note.title)
    setEditText(note.text)
    setEditCategory(note.category)
  }

  const saveEdit = () => {
    if (!selectedNote) return
    const updatedAt = formatNow()
    const categoryObj = categories.find(c => c.name === editCategory) || categories[0]

    updateNotes(prev =>
      prev.map(n =>
        n.id === selectedNote.id
          ? {
              ...n,
              title: editTitle,
              text: editText,
              category: editCategory,
              categoryColor: categoryObj.color,
              updatedDate: updatedAt
            }
          : n
      )
    )

    setSelectedNote(prev =>
      prev
        ? {
            ...prev,
            title: editTitle,
            text: editText,
            category: editCategory,
            categoryColor: categoryObj.color,
            updatedDate: updatedAt
          }
        : prev
    )
  }

  const filteredNotes = notes.filter(n => {
    const matchSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.text.toLowerCase().includes(searchTerm.toLowerCase())

    const matchCategory =
      categoryFilter === 'All' || n.category === categoryFilter

    return matchSearch && matchCategory
  })

  return (
    <div className="dashboard">
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="category-buttons">
          <button
            className={categoryFilter === 'All' ? 'active' : ''}
            onClick={() => setCategoryFilter('All')}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              className={categoryFilter === cat.name ? 'active' : ''}
              onClick={() => setCategoryFilter(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="input-bar">
        <Input updateFunction={addNote} categories={categories} />
      </div>

      <div className="notes-grid">
        {filteredNotes.map((n) => (
          <Note
            key={n.id}
            title={n.title}
            text={n.text}
            createTime={n.createTime}
            updatedDate={n.updatedDate}
            category={n.category}
            categoryColor={n.categoryColor}
            onDelete={() => removeNote(n.id)}
            onClick={() => openModal(n)}
          />
        ))}
      </div>

      <Modal
        opened={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        centered
        size="auto"
        withCloseButton={false}
        title={null}
        withinPortal={false}
      >
        {selectedNote && (
          <div
            className={`notes-container modal-note category-${selectedNote.category}`}
          >
            <div className="firstRow">
              <span className="noteDate">{selectedNote.createTime}</span>
            </div>

            <input
              className="noteTitle"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <TextareaAutosize
              className="noteText"
              minRows={6}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Your note..."
            />

            <select
              className="noteCategorySelect"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="modal-buttons">
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="default" onClick={() => setSelectedNote(null)}>
                Close
              </Button>
            </div>

            <div className="noteDates">
              <div className="createdLine">
                Created: {selectedNote.createTime}
              </div>
              {selectedNote.updatedDate && (
                <div className="updatedLine">
                  Updated: {selectedNote.updatedDate}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Dashboard
