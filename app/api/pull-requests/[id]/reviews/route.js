import { NextResponse } from "next/server"
import { reviewsData } from "../../../../../app/lib/mock-data"

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Pull request ID is required" }, { status: 400 })
    }

    if (!reviewsData[id]) {
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(reviewsData[id])
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

