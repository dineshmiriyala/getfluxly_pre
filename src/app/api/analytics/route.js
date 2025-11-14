import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/analytics`, {
    method: "GET",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}