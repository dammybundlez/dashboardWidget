// // app/api/spotify/refresh/route.ts
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { refresh_token } = await req.json();

//   const body = new URLSearchParams({
//     grant_type: 'refresh_token',
//     refresh_token,
//   });

//   const res = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       Authorization:
//         'Basic ' +
//         Buffer.from(
//           `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//         ).toString('base64'),
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body,
//   });

//   const data = await res.json();

//     if (!res.ok) {
//       console.error('Failed to refresh token:', data);
//       return NextResponse.json({ error: 'Failed to refresh token', details: data }, { status: 400 });
//     }

//   return NextResponse.json(data);
// }
