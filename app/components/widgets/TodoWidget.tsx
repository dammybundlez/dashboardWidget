'use client'

import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface Todo{
    id : string;
    text : string;
    completed : boolean;
    deadline?: string;
}

type Filter = 'all' | 'completed' | 'pending'

const TodoWidget = () => {
    const [ todo , setTodo ] = useState<Todo[]>([])
    const [ input , setInput ] = useState<string>('')
    const [ filter , setFilter ] = useState<Filter>('all')
    const [deadline , setDeadline ] = useState<string>('')
    const [ hasMounted , setHasMounted ] = useState(false)

    useEffect(() => {
    setHasMounted(true);
    const saved = typeof window !== 'undefined' && localStorage.getItem('todo');
    if (saved) {
      try {
        setTodo(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse localStorage:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('todo', JSON.stringify(todo));
    }
  }, [todo, hasMounted]);

    const addTodo = () => {
        if (!input.trim() || !deadline.trim()) return;
        const newTodo : Todo = {
            id : Date.now().toString(),
            text : input.trim(),
            completed : false , 
            deadline : deadline || undefined
        };
        setTodo([ ...todo , newTodo ]);
        setInput('');
        setDeadline('')
    }

    const removeTodo = ( id : string ) => {
        setTodo(todo.filter(t => t.id !== id));
    }

    const toggleTodo = ( id : string ) => {
        setTodo(todo.map(t => t.id === id ? { ...t , completed : !t.completed} : t         
        ))
    }
    const filteredTodos = todo.filter(t => {
      if(filter === 'all') return (
        !t.completed || t.completed
      )
      if(filter === 'pending') return !t.completed;
      if(filter === 'completed') return t.completed;
    })

    const sortedTodos = filteredTodos.sort((a, b) => {
        return Number(a.completed) - Number(b.completed);
    });

    if (!hasMounted) return null

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-2 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">📝 To-Do List</h2>
      <div className='flex justify-center items-center gap-2 mb-4'>
        {(['all' , 'pending' , 'completed'] as Filter[]).map(id => (
          <button key={id} onClick={() => setFilter(id)}
            className={`px-2 py-0.5 rounded-full text-xs border font-medium transition
              ${filter === id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600'}`
          }>
              {id === 'all' && 'All'}
              {id === 'pending' && 'Pending'}
              {id === 'completed' && 'Completed'}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 border-2 rounded px-2 py-1 text-sm w-full outline-0 dark:bg-gray-700 dark:text-white"
        />
        <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded text-sm dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={addTodo}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 overflow-y-auto">
        {todo.length === 0 && (
          <p className="text-gray-400 text-sm italic">No tasks yet.</p>
        )}
        {sortedTodos.map((t) => (
          <li
            key={t.id}
            className="flex justify-between bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-2 py-2 rounded relative"
          >
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
              />
              <span
                className={`text-sm relative ${
                  t.completed ? 'line-through text-gray-500' : 'text-black dark:text-white'
                }`}
              >
                {t.text}
                {t.deadline && (
                    <p className="text-xs">
                        due: {formatDistanceToNow(new Date(t.deadline), {addSuffix:true})}
                    </p>
                )}
              </span>
            </label>
            <button
              onClick={() => removeTodo(t.id)}
              className="text-red-500 text-sm hover:text-red-700 absolute top-2 right-2"
            >
              ✕
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  )
}

export default TodoWidget
