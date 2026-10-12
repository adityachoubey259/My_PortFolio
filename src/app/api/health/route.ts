import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "aditya-os",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

