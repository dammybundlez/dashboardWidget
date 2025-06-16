"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface Weather {
    city: string;
    temperature: number;
    condition: string;
    icon: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<null | Weather>(null)

  useEffect(() => {
    fetch("/api/weather?city=london")
      .then((res) => res.json()) 
      .then(setWeather)
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-2 rounded-xl shadow-md max-w-sm">
      <h2 className="text-xl font-semibold mb-2">🌦 Weather</h2>
      {weather ? (
        <div className="flex items-center gap-4">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
            className="w-12 h-12"
            width={48}
            height={48}
          />
          <div className="">
            <p className="text-lg font-bold">{weather.city}</p>
            <p className="font-lato">{weather.temperature}°C, {weather.condition}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-xs italic">Loading...</p>
      )}
    </div>
  );
}
