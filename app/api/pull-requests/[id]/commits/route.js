import { NextResponse } from "next/server"
import { commitsData } from "../../../../../app/lib/mock-data"

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Pull request ID is required" }, { status: 400 })
    }

    if (!commitsData[id]) {
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(commitsData[id])
  } catch (error) {
    console.error("Error fetching commits:", error)
    return NextResponse.json({ error: "Failed to fetch commits" }, { status: 500 })
  }
}

