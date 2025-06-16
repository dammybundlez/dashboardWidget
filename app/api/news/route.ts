import  { NextResponse } from "next/server";

export  async function GET() {
     const apiKey = process.env.NEWS_API_KEY;

  try {
    const apiRes = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&max=4&apikey=${apiKey}`
    );
    const data = await apiRes.json();
   return NextResponse.json({ articles : data.articles });
  } catch (err) {
    console.error(err)
    return NextResponse.json({error: 'failed to fetch'}, { status : 500});
  }
}
