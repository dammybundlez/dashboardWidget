'use client'

import React, { useState } from 'react'
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

dayjs.extend(weekday);
dayjs.extend(isToday);


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarWidget = () => {
    const [ currentDate , setCurrentDate ] = useState(dayjs())

    const daysInMonth = currentDate.daysInMonth();
    const day = currentDate.day()

    const dates = [];

    for (let i = 0; i < day; i++) {
        dates.push(null) 
    }

    for (let i = 1; i <= daysInMonth; i++) {
    dates.push(dayjs(currentDate).date(i));
     } 

    const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow w-full h-full">
      <div className="flex justify-between mb-4 px-3">
        <button onClick={prevMonth} className="text-gray-500 hover:text-gray-800 dark:text-gray-300 text-lg dark:hover:text-white">
          <FaCaretLeft />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button onClick={nextMonth} className="text-gray-500 text-lg hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
          <FaCaretRight />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-center mb-1 text-gray-600 dark:text-gray-400">
        {days.map((d) => (
          <div key={d} className={`${inter.className} font-semibold`}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {dates.map((date, index) =>
          date ? (
            <div
              key={index}
              className={`rounded p-2 text-center ${
                date.isToday()
                  ? 'bg-blue-500 text-white font-bold'
                  : 'text-gray-900 dark:text-gray-200'
              } hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer`}
            >
              {date.date()}
            </div>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  )
}

export default CalendarWidget
