import { NextResponse } from "next/server"
import { contributorsData } from "../../../../../app/lib/mock-data"
// import { getContributorsByPrId } from "@/app/lib/data-utils";

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Pull request ID is required" }, { status: 400 })
    }

    // First try to read from CSV if available
    // const contributors = getContributorsByPrId(id);

    // If CSV data is not available or empty, use mock data
    // if (!contributors || contributors.length === 0) {
    if (!contributorsData[id]) {
      return NextResponse.json([], { status: 200 })
    }
    return NextResponse.json(contributorsData[id])
    // }

    // return NextResponse.json(contributors);
  } catch (error) {
    console.error("Error fetching contributors:", error)
    return NextResponse.json({ error: "Failed to fetch contributors" }, { status: 500 })
  }
}

