import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const countryHeader = req.headers.get("x-vercel-ip-country");
    const regionHeader = req.headers.get("x-vercel-ip-country-region");
    const cityHeader = req.headers.get("x-vercel-ip-city");

    const enrichedBody = {
      ...body,
      country: body.country ?? countryHeader ?? null,
      region: body.region ?? regionHeader ?? null,
      city: body.city ?? cityHeader ?? null,
    };

    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/analytics`,
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(enrichedBody),
      }
    );

    if (!res.ok) {
      console.log(await res.text());
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
