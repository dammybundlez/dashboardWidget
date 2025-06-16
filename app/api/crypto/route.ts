import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coin = searchParams.get("coin") || "bitcoin";

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,
      { cache: "no-store" }
    );
    const data = await res.json();

    return NextResponse.json({
      coin,
      usd: data[coin].usd,
    });
  } catch (err) {
    return NextResponse.json({ err: "Crypto fetch failed" }, { status: 500 });
  }
}
