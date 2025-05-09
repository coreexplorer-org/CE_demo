import { NextResponse } from "next/server"
import { maintainersData } from "../../../app/lib/mock-data"

export async function GET() {
  try {
    // First try to read from CSV if available
    // const maintainers = readCsvFile('maintainers.csv');

    // If CSV data is not available, use mock data
    return NextResponse.json(maintainersData)
  } catch (error) {
    console.error("Error fetching maintainers data:", error)
    return NextResponse.json({ error: "Failed to fetch maintainers data" }, { status: 500 })
  }
}

