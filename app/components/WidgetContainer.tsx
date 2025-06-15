import { WidgetData } from "../types/widget";
import CalendarWidget from "./widgets/CalendarWidget";
import ClockWidget from "./widgets/ClockWidget";
import CryptoWidget from "./widgets/CryptoWidget";
import NewsWidget from "./widgets/NewsWidget";
import NoteWidget from "./widgets/NoteWidget";
import QuoteWidget from "./widgets/QuoteWidget"; // Add import
import SpotifyWidget from "./widgets/SpotifyWidget";
import TodoWidget from "./widgets/TodoWidget";
import WeatherWidget from "./widgets/WeatherWidget";
import './styles/mosanry.css'
import { Quicksand } from "next/font/google";
import { FaPlus } from "react-icons/fa";


const quick = Quicksand({
  subsets : ['vietnamese'],
  weight : ['400']
})

interface Props {
  widgets: WidgetData[];
  onRemove: (id: string) => void;
}

export default function WidgetContainer({ widgets, onRemove }: Props) {
  return (
    <div className= "masonry relative">
        {widgets.length === 0 ? (
          <p className={`${quick.className} flex items-center gap-2 absolute left-[43%] mt-40 text-2xl dark:text-gray-300`}>Add Widgets <span><FaPlus/></span></p>
        ) : (
          widgets.map((widget) => {
          let content;
          switch (widget.type) {
            case "clock":
              content = <ClockWidget />;
              break;
            case 'spotify':
              content = <SpotifyWidget />;
              break;
            case "quote":
              content = <QuoteWidget />;
              break;
            case 'weather':
              content = <WeatherWidget />;
              break;
            case 'crypto':
              content = <CryptoWidget />;
              break;
            case 'todo':
              content = <TodoWidget />;
              break;
            case 'note':
              content = <NoteWidget />;
              break;
            case 'news':
              content = <NewsWidget />;
              break;
            case 'calendar':
              content = <CalendarWidget />;
              break;
            default:
              content = <div>Unknown widget</div>;
          }

          return (
            <div key={widget.id} className="w-full mb-1 inline-block relative mt-5 prose prose-sm dark:prose-invert max-w-none group">
              {content}
              <button
                onClick={() => onRemove(widget.id)}
                className="absolute top-2 right-2 text-sm font-bold text-red-400 rounded hover:text-red-600 opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          );
        }))}
    </div>
  );
}
