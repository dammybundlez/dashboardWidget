'use client';

import { useEffect, useState } from 'react';
import { Quicksand } from 'next/font/google'
import { FiMusic } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const work_sans = Quicksand({
  subsets : ['latin'],
  weight : ['700']
})

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
    name: string;
  };
}

const SpotifyWidget = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setError('No-Spotify');
      return;
    }

    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          setError(msg);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.item) {
          setTrack(data.item);
        } else {
          setError('play-music');
        }
      })
      .catch(() => {
        setError('play-music');
      });
  }, []);

  if (error === 'No-Spotify') return <div className={`${work_sans.className}bg-white shadow  p-4 rounded  text-black dark:bg-white`}>connect to spotify <Link href={'/api/login'} className='underline text-red-600'>Click here</Link></div>;
  if (error === 'play-music') return <div className={`${work_sans.className}bg-white shadow  p-4 rounded dark:text-white dark:bg-gray-800`}> <p>Play music on spotify</p> </div>;

  if (!track) return <div className="bg-gray-100 p-4 rounded">Loading track...</div>;

  return (
    <div className="p-2 bg-white rounded dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2"><FiMusic/> Spotify</h2>
      <Image
        src={track.album.images[0].url}
        alt="Album cover"
        className="w-full object-cover h-48 rounded"
      />
      <div className={`${work_sans.className} flex items-center justify-between gap-2`}>
        <span>
          <h3 className="text-md font-bold text-gray-700 mt-2 dark:text-white">
            {track.artists.map((a) => a.name).join(', ')}
          </h3>
          <p className="text-xs font-bold dark:text-green-600">{track.name}</p>
        </span>
        <span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="180"
              viewBox="0 0 168 168"
              className="w-6 h-6"
            >
              <path fill="#1ED760" d="M84,0C37.7,0,0,37.7,0,84s37.7,84,84,84s84-37.7,84-84S130.3,0,84,0z"/>
              <path fill="#000"
                d="M121.1,120.9c-1.6,2.6-5,3.3-7.6,1.7c-20.9-12.8-47.3-15.7-78.4-8.6c-3,0.7-6.1-1.2-6.8-4.2
                c-0.7-3,1.2-6.1,4.2-6.8c34.5-7.9,64.3-4.5,88.3,9.9C122,115.2,122.7,118.3,121.1,120.9z M131.2,99.1c-2,3.1-6.2,4-9.3,2
                c-23.9-14.9-60.5-19.2-88.7-10.6c-3.5,1-7.2-1-8.2-4.5c-1-3.5,1-7.2,4.5-8.2c33.6-10.1,75.2-5.2,103.4,12.3
                C132.3,91.6,133.2,96,131.2,99.1z M133.3,75.5c-28-17.1-74.3-18.7-101.2-10.3c-4,1.3-8.3-0.9-9.6-4.9c-1.3-4,0.9-8.3,4.9-9.6
                c31.6-10.2,83.3-8.3,116.4,11.7c3.6,2.2,4.7,6.9,2.5,10.5C144.1,76.7,138.5,78.7,133.3,75.5z"/>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SpotifyWidget;
