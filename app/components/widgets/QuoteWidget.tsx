'use client'

import { useState , useEffect } from 'react'
interface Quote {
    content : string;
    author : string;
}

const QuoteWidget = () => {
    const [ quote , setQuote ] = useState<Quote | null>(null)
    const [ loading , setLoading ] = useState(true)
    const fetchQuote = async () => {
        try{
            setLoading(true);
            const res = await fetch("/api/quote");
            const data = await res.json();
            setQuote({
                content : data.content,
                author : data.author,
            });
        }catch(err){
            console.log(' error is ' , err)
            setQuote({
                content : "failed to fecth data",
                author : ''
            })
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchQuote();
    }, [])
    
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-xl w-full h-full p-2">
      <h2 className="text-xl font-bold mb-2">Quote</h2>
      {loading ? (
        <p className='text-gray-500 italic text-xs'>Loading...</p>
      ) : (
        <blockquote className="italic dark:text-white text-gray-700 mb-2 font-lato">
          “{quote?.content ? quote?.content :  'no content available.'}”
          <footer className="text-right text-sm font-bold font-lato mt-2">- {quote?.author}</footer>
        </blockquote>
      )}
      <button
        onClick={fetchQuote}
        className="mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
      >
        New Quote
      </button>
    </div>
  )
}

export default QuoteWidget
