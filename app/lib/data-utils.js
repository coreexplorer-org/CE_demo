import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"
import { pullRequestsData, pullRequestDetailsData, contributorsData } from "./mock-data"

// Helper function to read and parse CSV files
export function readCsvFile(filename) {
  try {
    const filePath = path.join(process.cwd(), "data", filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    })
  } catch (error) {
    console.error(`Error reading CSV file ${filename}:`, error)
    return []
  }
}

// Function to get pull requests from CSV or fallback to mock data
export function getPullRequests(status = null) {
  try {
    const pullRequests = readCsvFile("pull-requests.csv")

    if (pullRequests.length === 0) {
      // Fallback to mock data
      return status ? pullRequestsData[status] : []
    }

    if (status) {
      return pullRequests.filter((pr) => pr.status === status)
    }

    return pullRequests
  } catch (error) {
    console.error("Error getting pull requests:", error)
    return status ? pullRequestsData[status] : []
  }
}

// Function to get a specific pull request by ID
export function getPullRequestById(id) {
  try {
    const pullRequests = readCsvFile("pull-requests.csv")

    if (pullRequests.length === 0) {
      // Fallback to mock data
      return pullRequestDetailsData[id] || null
    }

    return pullRequests.find((pr) => pr.id === id) || null
  } catch (error) {
    console.error("Error getting pull request by ID:", error)
    return pullRequestDetailsData[id] || null
  }
}

// Function to get contributors for a specific PR
export function getContributorsByPrId(prId) {
  try {
    const contributors = readCsvFile("contributors.csv")

    if (contributors.length === 0) {
      // Fallback to mock data
      return contributorsData[prId] || []
    }

    return contributors.filter((contributor) => contributor.pr_id === prId)
  } catch (error) {
    console.error("Error getting contributors by PR ID:", error)
    return contributorsData[prId] || []
  }
}

