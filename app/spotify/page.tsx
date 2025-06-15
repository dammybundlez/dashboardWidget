'use client';

import { useEffect } from 'react';
import { useSearchParams , useRouter } from 'next/navigation';
import { Link } from 'lucide-react';


export default function SpotifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('access_token');
  const router = useRouter();
 
   useEffect(() => {
    if (token) {
      localStorage.setItem('spotify_token', token);
      // router.push('http://127.0.0.1:3000/');
    }
  }, [token]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <p className="text-gray-600">connected to Spotify... <Link href='/'>return to dashboard</Link></p>
    </div>
  );
}
