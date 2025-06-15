// app/api/quote/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/random", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("connecting...");
    }

    const data = await res.json();

    return NextResponse.json({
      content: data[0].q,
      author: data[0].a,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Server error: couldn't fetch quote" },
      { status: 500 }
    );
  }
}
