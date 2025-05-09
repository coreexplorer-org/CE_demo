import { NextResponse } from "next/server"
import { repositoryData } from "../../../app/lib/mock-data.js"

export async function GET() {
  try {
    // First try to read from CSV if available
    // const repoInfo = readCsvFile('repository.csv')[0];

    // If CSV data is not available, use mock data
    return NextResponse.json(repositoryData)
  } catch (error) {
    console.error("Error fetching repository data:", error)
    return NextResponse.json({ error: "Failed to fetch repository data" }, { status: 500 })
  }
}

