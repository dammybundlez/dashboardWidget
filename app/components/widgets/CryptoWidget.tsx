"use client";
import { useEffect, useState } from "react";

export default function CryptoWidget() {
  const [ coin , setCoin ] = useState('bitcoin');
  const [ input , setInput ] = useState("bitcoin")
  const [price, setPrice] = useState<null | { coin: string; usd: number }>(null);

  useEffect(() => {
    fetch(`/api/crypto?coin=${coin}`)
      .then((res) => res.json())
      .then((data) => {
         if (!data.usd) throw new Error("Invalid coin");
        setPrice(data);
      })
      .catch(() => setPrice(null));
  }, [coin]);

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-2 rounded-xl shadow-md w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-2">💰 Crypto Data</h2>
      <div className="mb-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 border-yellow-300 rounded dark:text-white px-2 py-1 text-sm w-full outline-yellow-300 dark:bg-gray-700"
          placeholder="e.g. bitcoin, ethereum"
        />
        <button
          onClick={() => setCoin(input.toLowerCase())}
          className="bg-yellow-600 text-white px-3 py-1 rounded text-sm"
        >
          Go
        </button>
      </div>
      {price && typeof price.usd === "number" ? (
        <p className="text-lg font-bold capitalize">{coin} : ${price.usd.toLocaleString()}</p>
      ) : (
        <p className="text-sm italic text-gray-500">unavailable or invalid coin</p>
      )}
    </div>
  );
}
