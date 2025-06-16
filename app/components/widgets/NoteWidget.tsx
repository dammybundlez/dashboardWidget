'use client'

import React, { useEffect, useState } from 'react'

interface Note {
    id : string;
    title : string;
    content : string
  }
  
const NoteWidget = () => {
    const [ notes , setNotes ] = useState<Note[]>([])
    const [ title , setTitle ] = useState<string>('')
    const [ content , setContent ] = useState<string>('')
    const [ hasMounted , setHasMounted ] = useState(false)

    useEffect(() => {
        setHasMounted(true)
        const saved = typeof window !== 'undefined' && localStorage.getItem('note')
        if ( saved ) {setNotes(JSON.parse(saved))}
    }, [])

    useEffect(() => {
        if(hasMounted){
          localStorage.setItem('note', JSON.stringify(notes))   
        }
    }, [notes , hasMounted])

    const addNote = () => {
        if(!title.trim() && !content.trim()) return;
        const newNote : Note = {
            id : Date.now().toString(),
            title : title.trim() || 'untitled',
            content : content.trim(),
        };
        setNotes([ ...notes , newNote]);
        setContent('');
        setTitle('')
    }

    const deleteNote = ( id : string ) => {
        setNotes(notes.filter(n => n.id !== id))
    }
  return (
    <div className="p-2 bg-white dark:bg-gray-800 rounded shadow w-full h-full">
      <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🗒 Notes</h2>
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-1 text-sm border-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <textarea
          // type='textarea'
          placeholder = 'what`s on your mind...'
          rows={5}
          cols={30}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none p-2 border-2 rounded dark:bg-gray-700 dark:text-white"
      />
        <button
          onClick={addNote}
          className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-64">
        {notes.map(note => (
          <div
            key={note.id}
            className="bg-gray-100 dark:bg-gray-700 p-3 rounded relative group"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">{note.title}</h3>
            <div className="prose prose-sm dark:prose-invert dark:text-white max-w-none text-sm">
              <span>
                {note.content}
              </span>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NoteWidget
