import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      email,
      utm_source = null,
      utm_medium = null,
      utm_campaign = null,
    } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/waitlist`,
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email,
          utm_source,
          utm_medium,
          utm_campaign,
          created_at: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      console.log(await res.text());
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("Waitlist Route Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
