'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'


interface News {
    title : string,
    description : string,
    url : string,
    source: { name: string };
}
const NewsWidget = () => {
    const [loading , setLoading ] = useState<boolean>(true)
    const [news , setNews ] = useState<News[]>([])

    const fetchNews = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/news');
            const data = await res.json();
            setNews(data.articles || null)
        } catch (error) {
            console.log( 'error is :' , error );
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchNews();
    } , [])
  return (
    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow w-full h-full">
      <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">📰 Top News</h2>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-xs italic">Loading...</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {news?.map((article, idx) => (
            <li key={idx} className="border-b pb-2 last:border-none">
              <Link
                href={article.url}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold line-clamp-2"
              >
                {article.title}
              </Link>
              <p className="text-gray-700 text-xs mt-1 font-semibold font-lato dark:text-gray-300 line-clamp-3">{article.description}</p>
              <span className="text-xs text-black font-bold dark:text-white dark:underline cursor-pointer">{article.source.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NewsWidget
