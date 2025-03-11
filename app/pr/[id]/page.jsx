"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { FaCodeBranch, FaGithub, FaArrowLeft, FaCode, FaComment, FaUsers, FaChartPie } from "react-icons/fa"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PullRequest({ params }) {
  const { id } = params
  const [pr, setPR] = useState(null)
  const [contributors, setContributors] = useState([])
  const [commits, setCommits] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCommit, setActiveCommit] = useState(null)
  const [commitChanges, setCommitChanges] = useState({})
  const [aiMessage, setAiMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [isSending, setIsSending] = useState(false)
  const chatInputRef = useRef(null)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      try {
        // Fetch PR details
        const prResponse = await fetch(`/api/pull-requests/${id}`)
        const prData = await prResponse.json()
        setPR(prData)
        document.title = `#${prData.number} ${prData.title} - Bitcoin Core Explorer`

        // Fetch contributors
        const contributorsResponse = await fetch(`/api/pull-requests/${id}/contributors`)
        const contributorsData = await contributorsResponse.json()
        setContributors(contributorsData)

        // Fetch commits
        const commitsResponse = await fetch(`/api/pull-requests/${id}/commits`)
        const commitsData = await commitsResponse.json()
        setCommits(commitsData)

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/pull-requests/${id}/reviews`)
        const reviewsData = await reviewsResponse.json()
        setReviews(reviewsData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const toggleCommitDetails = (commitId) => {
    setActiveCommit(activeCommit === commitId ? null : commitId)
  }

  const loadCommitChanges = async (commitId) => {
    if (commitChanges[commitId]) return

    try {
      const response = await fetch(`/api/commits/${commitId}/changes`)
      const data = await response.json()
      setCommitChanges({
        ...commitChanges,
        [commitId]: data.changes,
      })
    } catch (error) {
      console.error("Error loading commit changes:", error)
      setCommitChanges({
        ...commitChanges,
        [commitId]: "error",
      })
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!aiMessage.trim() || isSending) return

    const newMessage = {
      role: "user",
      content: aiMessage,
    }

    setChatMessages([...chatMessages, newMessage])
    setAiMessage("")
    setIsSending(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: aiMessage,
          prId: id,
        }),
      })

      const data = await response.json()

      setChatMessages([
        ...chatMessages,
        newMessage,
        {
          role: "assistant",
          content: data.response,
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      setChatMessages([
        ...chatMessages,
        newMessage,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  // Prepare chart data
  const chartData = {
    labels: contributors.map((c) => c.name),
    datasets: [
      {
        data: contributors.map((c) => c.contributionPercentage),
        backgroundColor: [
          "#f97316", // orange-500
          "#3b82f6", // blue-500
          "#10b981", // emerald-500
          "#8b5cf6", // violet-500
          "#ec4899", // pink-500
          "#f59e0b", // amber-500
          "#06b6d4", // cyan-500
        ],
        borderWidth: 1,
        borderColor: "#1f2937", // gray-800
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb", // gray-200
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaCodeBranch className="text-orange-500 mr-3 text-2xl" />
              <h1 className="text-xl font-mono font-bold text-orange-400">Bitcoin Core Explorer</h1>
            </div>
            <a
              href="https://github.com/bitcoin/bitcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-orange-400 transition-colors"
            >
              <FaGithub className="mr-2" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-4">
                <FaArrowLeft className="mr-2" />
                Back to Repository
              </Link>

              {pr && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    #{pr.number} {pr.title}
                  </h1>
                  <div className="text-gray-400 mb-4">
                    Opened by {pr.author.name} on {new Date(pr.openedAt).toLocaleDateString()}
                    {pr.status === "closed" && pr.closedAt && (
                      <span className="ml-3 text-red-400">
                        • Closed on {new Date(pr.closedAt).toLocaleDateString()}
                      </span>
                    )}
                    {pr.status === "merged" && pr.mergedAt && (
                      <span className="ml-3 text-purple-400">
                        • Merged on {new Date(pr.mergedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    {pr.description ? (
                      <div dangerouslySetInnerHTML={{ __html: formatDescription(pr.description) }} />
                    ) : (
                      <p className="text-gray-400">No description provided.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Contributors */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold flex items-center">
                      <FaUsers className="mr-2 text-orange-400" />
                      <span>Contributors</span>
                    </h2>
                  </div>
                  <div className="p-0">
                    {contributors.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {contributors.map((contributor) => (
                          <li key={contributor.uuid} className="p-4 hover:bg-gray-750 transition-colors">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{contributor.name}</div>
                                <div className="text-sm text-gray-400">{contributor.email}</div>
                              </div>
                              <div className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                                {contributor.contributionPercentage}%
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-gray-400">No contributors found</div>
                    )}
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold flex items-center">
                      <FaComment className="mr-2 text-orange-400" />
                      <span>Reviews</span>
                    </h2>
                  </div>
                  <div className="p-4">
                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.map((review) => {
                          let reviewClass = "bg-gray-750 border-gray-700"
                          if (review.hasACK) {
                            reviewClass = "bg-green-900/30 border-green-800"
                          } else if (review.hasNACK) {
                            reviewClass = "bg-red-900/30 border-red-800"
                          }

                          return (
                            <div key={review.id} className={`p-4 rounded-lg border ${reviewClass}`}>
                              <div className="flex justify-between mb-2">
                                <div className="font-medium">{review.reviewer.name}</div>
                                <div className="text-sm text-gray-400">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-gray-300 whitespace-pre-line">{review.comment}</div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-gray-400">No reviews found</div>
                    )}
                  </div>
                </div>

                {/* Commits */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold flex items-center">
                      <FaCode className="mr-2 text-orange-400" />
                      <span>Commits</span>
                    </h2>
                  </div>
                  <div className="p-0">
                    {commits.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {commits.map((commit) => (
                          <li key={commit.id}>
                            <div
                              className="p-4 cursor-pointer hover:bg-gray-750 transition-colors"
                              onClick={() => toggleCommitDetails(commit.id)}
                            >
                              <div className="flex justify-between">
                                <div className="font-medium">{commit.shortDescription}</div>
                                <div className="text-sm font-mono text-gray-400">{commit.hash.substring(0, 7)}</div>
                              </div>
                              <div className="text-sm text-gray-400 mt-1">
                                By {commit.author.name} on {new Date(commit.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            {activeCommit === commit.id && (
                              <div className="p-4 bg-gray-750 border-t border-gray-700">
                                <div className="mb-4">
                                  <div className="text-sm text-gray-300 mb-2">
                                    <strong>Author:</strong> {commit.author.name} ({commit.author.email})
                                  </div>

                                  {commit.coAuthors.length > 0 && (
                                    <div className="text-sm text-gray-300 mb-2">
                                      <strong>Co-authors:</strong>
                                      <ul className="list-disc list-inside ml-2 mt-1">
                                        {commit.coAuthors.map((coAuthor, index) => (
                                          <li key={index}>
                                            {coAuthor.name} ({coAuthor.email})
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {commit.longDescription && (
                                    <div className="text-sm text-gray-300 mb-2">
                                      <strong>Description:</strong>
                                      <p className="whitespace-pre-line mt-1">{commit.longDescription}</p>
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <strong className="text-sm text-gray-300">Changes:</strong>
                                  {!commitChanges[commit.id] ? (
                                    <button
                                      className="ml-3 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                                      onClick={() => loadCommitChanges(commit.id)}
                                    >
                                      Load changes
                                    </button>
                                  ) : commitChanges[commit.id] === "error" ? (
                                    <div className="mt-2 text-red-400 text-sm">Error loading changes</div>
                                  ) : (
                                    <div className="mt-3 space-y-4">
                                      {commitChanges[commit.id].map((change, index) => (
                                        <div key={index}>
                                          <div className="text-sm font-mono text-gray-300 mb-2">{change.filename}</div>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-red-900/20 p-3 rounded font-mono overflow-x-auto whitespace-pre">
                                              {change.removedLines.length > 0
                                                ? change.removedLines.join("\n")
                                                : "(No lines removed)"}
                                            </div>
                                            <div className="bg-green-900/20 p-3 rounded font-mono overflow-x-auto whitespace-pre">
                                              {change.addedLines.length > 0
                                                ? change.addedLines.join("\n")
                                                : "(No lines added)"}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-gray-400">No commits found</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Contribution Chart */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold flex items-center">
                      <FaChartPie className="mr-2 text-orange-400" />
                      <span>Contribution Breakdown</span>
                    </h2>
                  </div>
                  <div className="p-4">
                    {contributors.length > 0 ? (
                      <div className="h-64">
                        <Pie data={chartData} options={chartOptions} />
                      </div>
                    ) : (
                      <div className="text-gray-400">No contribution data available</div>
                    )}
                  </div>
                </div>

                {/* AI Chat */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold flex items-center">
                      <span className="mr-2 text-orange-400">🤖</span>
                      <span>AI Assistant</span>
                    </h2>
                  </div>
                  <div className="flex flex-col h-96">
                    <div className="flex-1 p-4 overflow-y-auto">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-400 mt-8">
                          <p>Ask the AI assistant about this pull request</p>
                          <p className="text-sm mt-2">Example: "Summarize the changes in this PR"</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatMessages.map((msg, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                msg.role === "user" ? "bg-gray-700 ml-8" : "bg-gray-750 border border-gray-700 mr-8"
                              }`}
                            >
                              <div className="text-sm font-medium mb-1">
                                {msg.role === "user" ? "You" : "AI Assistant"}
                              </div>
                              <div className="text-gray-300 whitespace-pre-line">{msg.content}</div>
                            </div>
                          ))}
                          {isSending && (
                            <div className="bg-gray-750 border border-gray-700 rounded-lg p-3 mr-8 flex items-center">
                              <div className="text-sm font-medium mr-2">AI Assistant</div>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray-700 p-3">
                      <form onSubmit={handleSendMessage} className="flex">
                        <input
                          type="text"
                          ref={chatInputRef}
                          value={aiMessage}
                          onChange={(e) => setAiMessage(e.target.value)}
                          placeholder="Ask about this PR..."
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 text-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        <button
                          type="submit"
                          disabled={isSending || !aiMessage.trim()}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

// Helper function to format PR description with basic markdown
function formatDescription(description) {
  return description
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
}

