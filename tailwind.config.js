/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/components/widgets/CalendarWidget.tsx' , './app/components/widgets/ClockWidget.tsx' , './app/components/widgets/SpotifyWidget.tsx' , './app/components/widgets/NewsWidget.tsx' , './app/components/widgets/CryptoWidget.tsx' ,
    './app/components/widgets/NoteWidget.tsx' , './app/components/widgets/QuoteWidget.tsx' , './app/components/widgets/TodoWidget.tsx' , './app/components/widgets/WeatherWidget.tsx' , './app/components/layout/MainLayout.tsx' , './app/components/WidgetContainer.tsx',
    './app/components/ThemeToggle.tsx' , './app/page.tsx'
   ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class'
};
