'use client'

import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [ isDark , setIsDark ] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if(saved === 'dark'){
            document.documentElement.classList.add('dark')
            setIsDark(true)
        }
    }, [])

    const toggleTheme = () => {
        const root = document.documentElement;
        if (isDark) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    }


  return (
    <button
      onClick={toggleTheme}
      className="fixed top-20 right-8 z-50 p-2 dark:bg-gray-200 bg-gray-800 rounded-full shadow"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="text-blue-600" /> : <Moon className="text-yellow-600" />}
    </button>
  )
}

export default ThemeToggle
