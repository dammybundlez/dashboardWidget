'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from 'lucide-react';


function SearchComp() {
   const searchParams = useSearchParams();
  const token = searchParams.get('access_token');

 
   useEffect(() => {
    if (token) {
      localStorage.setItem('spotify_token', token);
    }
  }, [token]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <p className="text-gray-600">connected to Spotify... <Link href='/'>return to dashboard</Link></p>
    </div>
  );
}

export default function SpotifyPage() {
  <Suspense fallback={<div>loading...</div>}>
    <SearchComp />
  </Suspense>
}
