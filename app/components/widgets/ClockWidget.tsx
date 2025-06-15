'use client'

import { useEffect , useState } from 'react'
import { DateTime } from 'luxon'


const timezones = [
  "Africa/Lagos",
  "Europe/London",
  "America/New_York",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
];

const ClockWidget = () => {
    const [ zone , setZone ] = useState("African/Lagos")
    const [ time , setTime ] = useState(DateTime.now().setZone(zone))

    useEffect(() => {
        const savedZone = localStorage.getItem('timezone')
        if ( savedZone ){
            setZone(savedZone);
            setTime(DateTime.now().setZone(savedZone))
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {setTime(DateTime.now().setZone(zone))}, 1000)
        return () => clearInterval(interval);
    } , [zone])

    const handleZoneChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const newZone = e.target.value;
    setZone(newZone);
    localStorage.setItem("timezone", newZone);
  };

  return (
    <div className="bg-white rounded dark:text-white w-full p-2 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-2">⏰ Clock</h2>
      <p className="text-3xl font-mono dark:text-blue-300 text-blue-700">
        {time.toFormat("hh:mm:ss a")}
      </p>
      <p className="text-sm font-medium dark:text-white text-gray-600">{time.toFormat("cccc, dd LLL yyyy")}</p>

      <div className="mt-4">
        <label className="text-sm font-bold text-gray-700 dark:text-white mr-2">Timezone:</label>
        <select
          value={zone}
          onChange={handleZoneChange}
          className="mt-1 block w-full outline-none rounded-md text-white bg-blue-600 border-gray-300 shadow-sm"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ClockWidget
