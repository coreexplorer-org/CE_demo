import { NextResponse } from "next/server"
import { pullRequestsData } from "../../../app/lib/mock-data"
// import { getPullRequests } from "@/app/lib/data-utils";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    if (!status || !pullRequestsData[status]) {
      return NextResponse.json({ error: "Invalid status parameter" }, { status: 400 })
    }

    // First try to read from CSV if available
    // const pullRequests = getPullRequests(status);

    // If CSV data is not available or empty, use mock data
    // if (!pullRequests || pullRequests.length === 0) {
    return NextResponse.json(pullRequestsData[status])
    // }

    // return NextResponse.json(pullRequests);
  } catch (error) {
    console.error("Error fetching pull requests:", error)
    return NextResponse.json({ error: "Failed to fetch pull requests" }, { status: 500 })
  }
}

