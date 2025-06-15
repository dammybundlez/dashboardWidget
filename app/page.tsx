'use client'

import { useEffect, useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import WidgetContainer from "./components/WidgetContainer";
import { WidgetData, WidgetType } from "./types/widget";
import { v4 as uuidv4 } from 'uuid'

const WIDGETS : WidgetData[] = [
    { id : uuidv4() , type : 'clock'},
    { id : uuidv4() , type : 'weather'},
    { id : uuidv4() , type : 'quote'},
    { id : uuidv4() , type : 'crypto'},
    { id : uuidv4() , type : 'todo'},
    { id : uuidv4() , type : 'note'},
    { id : uuidv4() , type : 'news'},
    { id : uuidv4() , type : 'calendar'},
    { id : uuidv4() , type : 'spotify'}
]
export default function Home() {
  const [ widgets , setWidgets ] = useState<WidgetData[]>([])

  useEffect(() => {
      const saved = localStorage.getItem("dashboard-widgets");
      if (saved) {
        setWidgets(JSON.parse(saved));
      } else {
        setWidgets(WIDGETS);
      }
    }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-widgets", JSON.stringify(widgets));
  }, [widgets]);
  
  const [ newWidgetType , SetNewWidgetType ] = useState<WidgetType>('weather');

  const addWidget = () => {
    const  newWidget: WidgetData = {
      id : uuidv4(),
      type: newWidgetType,
    }
    setWidgets((prev) => [...prev , newWidget])
  }

  const removeWidget = (id : string) => {
      setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  }
  return (
        <MainLayout>
          <h1 className="font-extrabold text-lg dark:text-white">Welcome to Your Dashboard</h1>
          <div className="flex gap-4 mb-6">
            <select value={newWidgetType} onChange={(e) => SetNewWidgetType(e.target.value as WidgetType)} className=" dark:text-white py-1 dark:bg-gray-800 rounded outline-none font-lato">
              <option value="" disabled>- Select a Widget -</option>
              <option value="clock">Clock</option>
              <option value="quote">Quote</option>
              <option value="weather">Weather</option>
              <option value="crypto">Crypto</option>
              <option value="todo">To-do</option>
              <option value="note">Note</option>
              <option value="news">News</option>
              <option value="calendar">Calendar</option>
              <option value="spotify">Spotify</option>
            </select>
            <button onClick={addWidget} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Widget
            </button>
          </div>
            <WidgetContainer widgets={widgets} onRemove={removeWidget} />
        </MainLayout>  
    );
}
