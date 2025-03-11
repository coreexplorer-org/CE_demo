import { NextResponse } from "next/server"
import { pullRequestDetailsData } from "@/app/lib/mock-data"
// import { getPullRequestById } from "@/app/lib/data-utils";

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Pull request ID is required" }, { status: 400 })
    }

    // First try to read from CSV if available
    // const pullRequest = getPullRequestById(id);

    // If CSV data is not available, use mock data
    // if (!pullRequest) {
    if (!pullRequestDetailsData[id]) {
      return NextResponse.json({ error: "Pull request not found" }, { status: 404 })
    }
    return NextResponse.json(pullRequestDetailsData[id])
    // }

    // return NextResponse.json(pullRequest);
  } catch (error) {
    console.error("Error fetching pull request details:", error)
    return NextResponse.json({ error: "Failed to fetch pull request details" }, { status: 500 })
  }
}

