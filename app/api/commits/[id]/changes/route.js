import { NextResponse } from "next/server"
import { commitChangesData } from "../../../../../app/lib/mock-data"

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Commit ID is required" }, { status: 400 })
    }

    if (!commitChangesData[id]) {
      return NextResponse.json({ error: "Commit changes not found" }, { status: 404 })
    }

    return NextResponse.json(commitChangesData[id])
  } catch (error) {
    console.error("Error fetching commit changes:", error)
    return NextResponse.json({ error: "Failed to fetch commit changes" }, { status: 500 })
  }
}

