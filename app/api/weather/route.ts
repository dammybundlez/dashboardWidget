import  { NextResponse , NextRequest } from "next/server";

export  async function GET( req : NextRequest) {
    const { searchParams } = new URL(req.url) 
  const city = searchParams.get("city") || 'lagos'
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) return NextResponse.json({ error: "City is required" } , {status : 400});

  try {
    const apiRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await apiRes.json();

   return NextResponse.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.error(err)
    NextResponse.json({error: 'failed to fetch'} , { status : 500});
  }
}
