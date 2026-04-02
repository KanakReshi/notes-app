import React, { useState, useEffect } from 'react'
import './App.css'

const NOTE_COLORS = ['#fef08a', '#f9a8d4', '#86efac', '#93c5fd', '#d8b4fe', '#fdba74']

const App = () => {
  const [title, settitle] = useState('')
  const [details, setdetails] = useState('')
  const [task, settask] = useState(() => {
    try {
      const saved = localStorage.getItem('notes-app-tasks')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [editIndex, setEditIndex] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('notes-app-theme') !== 'light'
  })
  const notesWithDetails = task.filter(note => note.details.trim().length > 0).length
  const draftCharacters = title.trim().length + details.trim().length
  const draftStatus = editIndex !== null
    ? 'Editing note'
    : draftCharacters > 0
      ? 'Draft in progress'
      : 'Ready to create'

  useEffect(() => {
    localStorage.setItem('notes-app-tasks', JSON.stringify(task))
  }, [task])

  useEffect(() => {
    localStorage.setItem('notes-app-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const resetForm = () => {
    settitle('')
    setdetails('')
    setEditIndex(null)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const copyTask = [...task]
    if (editIndex !== null) {
      copyTask[editIndex] = { ...copyTask[editIndex], title, details }
    } else {
      copyTask.push({ title, details, color: NOTE_COLORS[copyTask.length % NOTE_COLORS.length] })
    }
    settask(copyTask)
    resetForm()
  }

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    settask(copyTask)
    if (editIndex === idx) { resetForm(); return }
    if (editIndex !== null && idx < editIndex) setEditIndex(editIndex - 1)
  }

  const editNote = (idx) => {
    settitle(task[idx].title)
    setdetails(task[idx].details)
    setEditIndex(idx)
  }

  return (
    <div className={`app-wrapper${darkMode ? '' : ' light'}`}>

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">📝</span>
          <span className="brand-name">NoteSpace</span>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(d => !d)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <h2 className="form-heading">
          {editIndex !== null ? '✏️ Edit Note' : '+ New Note'}
        </h2>

        <form onSubmit={submitHandler} className="note-form">
          <div className="field">
            <label className="field-label">Title</label>
            <input
              type="text"
              required
              placeholder="Note heading…"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="field-input"
            />
          </div>

          <div className="field field-grow">
            <label className="field-label">Details</label>
            <textarea
              placeholder="Write something…"
              value={details}
              onChange={(e) => setdetails(e.target.value)}
              className="field-textarea"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editIndex !== null ? 'Update Note' : 'Add Note'}
            </button>
            {editIndex !== null && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="sidebar-insights">
          <div className="insights-card">
            <div className="insights-header">
              <p className="insights-eyebrow">Workspace Snapshot</p>
              <span className="insights-status">{draftStatus}</span>
            </div>

            <div className="insights-grid">
              <div className="insight-tile">
                <span className="insight-value">{task.length}</span>
                <span className="insight-label">Total notes</span>
              </div>
              <div className="insight-tile">
                <span className="insight-value">{notesWithDetails}</span>
                <span className="insight-label">Detailed notes</span>
              </div>
              <div className="insight-tile">
                <span className="insight-value">{draftCharacters}</span>
                <span className="insight-label">Draft chars</span>
              </div>
            </div>

            <div className="palette-preview">
              <p className="palette-title">Note palette</p>
              <div className="palette-swatches">
                {NOTE_COLORS.map((color) => (
                  <span
                    key={color}
                    className="palette-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <p className="note-count">
          {task.length} note{task.length !== 1 ? 's' : ''} saved
        </p>
      </aside>

      {/* ── Main ── */}
      <main className="main-area">
        <div className="main-header">
          <h1 className="main-title">Recent Notes</h1>
          {task.length > 0 && (
            <span className="notes-badge">{task.length} total</span>
          )}
        </div>

        {task.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🗒️</span>
            <p className="empty-title">No notes yet</p>
            <p className="empty-sub">Add your first note from the sidebar</p>
          </div>
        ) : (
          <div className="notes-grid">
            {task.map((elem, idx) => (
              <div
                key={idx}
                className={`note-card${editIndex === idx ? ' note-card--active' : ''}`}
              >
                <div className="note-rings" aria-hidden="true">
                  {Array.from({ length: 6 }).map((_, ringIdx) => (
                    <span key={ringIdx} className="note-ring" />
                  ))}
                </div>
                <div
                  className="note-body"
                  onClick={() => editNote(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      editNote(idx)
                    }
                  }}
                  title="Click to edit note"
                >
                  <h3 className="note-title">{elem.title}</h3>
                  <p className="note-details">{elem.details}</p>
                </div>
                <div className="note-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      editNote(idx)
                    }}
                    className="note-btn note-btn--edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNote(idx)
                    }}
                    className="note-btn note-btn--delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
