"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { FaGithub, FaCodeBranch, FaUsers, FaExternalLinkAlt } from "react-icons/fa"

export default function Home() {
  const [repository, setRepository] = useState(null)
  const [maintainers, setMaintainers] = useState([])
  const [openPRs, setOpenPRs] = useState([])
  const [closedPRs, setClosedPRs] = useState([])
  const [mergedPRs, setMergedPRs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const repoResponse = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query {
                repository(name: "bitcoin") {
                  name
                  url
                  description
                }
              }
            `
          })
        })

        const result = await repoResponse.json()
        setRepository(result.data.repository)

        // Fetch maintainers
        const maintainersResponse = await fetch("http://localhost/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query GetActors {
          actors {
            name
            email
          }
        }
      `
    })
  })
        const maintainersData = await maintainersResponse.json()
        setMaintainers(maintainersData)

        // Fetch PRs
        const openResponse = await fetch("/api/pull-requests?status=open")
        const openData = await openResponse.json()
        setOpenPRs(openData)

        const closedResponse = await fetch("/api/pull-requests?status=closed")
        const closedData = await closedResponse.json()
        setClosedPRs(closedData)

        const mergedResponse = await fetch("/api/pull-requests?status=merged")
        const mergedData = await mergedResponse.json()
        setMergedPRs(mergedData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
            <Image src="/core_explorer-png.png" alt="Logo" width={80} height={80} className="mr-3" />
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
              <FaExternalLinkAlt className="ml-1 text-xs" />
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
            {repository && (
              <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-white flex items-center">
                  <span className="text-orange-400">{repository.name}</span>
                </h2>
                <p className="text-gray-400 mb-4">{repository.description}</p>
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 flex items-center w-fit"
                >
                  <span>View on GitHub</span>
                  <FaExternalLinkAlt className="ml-1 text-xs" />
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold flex items-center">
                      <FaUsers className="mr-2 text-orange-400" />
                      <span>Active Maintainers</span>
                    </h2>
                  </div>
                  <div className="p-0">
                    {maintainers.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {maintainers.map((maintainer) => (
                          <li key={maintainer.uuid} className="p-4 hover:bg-gray-750 transition-colors">
                            <div className="font-medium">{maintainer.name}</div>
                            <div className="text-sm text-gray-400">{maintainer.email}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-gray-400">No maintainers found</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
                  <Tabs className="w-full">
                    <TabList className="flex bg-gray-750 border-b border-gray-700">
                      <Tab className="px-6 py-3 text-gray-400 hover:text-orange-400 cursor-pointer border-b-2 border-transparent focus:outline-none selected:border-orange-400 selected:text-orange-400">
                        Open PRs
                      </Tab>
                      <Tab className="px-6 py-3 text-gray-400 hover:text-orange-400 cursor-pointer border-b-2 border-transparent focus:outline-none selected:border-orange-400 selected:text-orange-400">
                        Closed PRs
                      </Tab>
                      <Tab className="px-6 py-3 text-gray-400 hover:text-orange-400 cursor-pointer border-b-2 border-transparent focus:outline-none selected:border-orange-400 selected:text-orange-400">
                        Merged PRs
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <PRList prs={openPRs} />
                    </TabPanel>
                    <TabPanel>
                      <PRList prs={closedPRs} />
                    </TabPanel>
                    <TabPanel>
                      <PRList prs={mergedPRs} />
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function PRList({ prs }) {
  if (prs.length === 0) {
    return <div className="p-6 text-gray-400">No pull requests found</div>
  }

  return (
    <ul className="divide-y divide-gray-700">
      {prs.map((pr) => (
        <li key={pr.id} className="hover:bg-gray-750 transition-colors">
          <Link href={`/pr/${pr.id}`} className="block p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white hover:text-orange-400">
                  #{pr.number} {pr.title}
                </h3>
                <div className="text-sm text-gray-400 mt-1">
                  Opened by {pr.author.name} on {new Date(pr.openedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {pr.status === "closed" && pr.closedAt && (
                  <span className="text-red-400">Closed on {new Date(pr.closedAt).toLocaleDateString()}</span>
                )}
                {pr.status === "merged" && pr.mergedAt && (
                  <span className="text-purple-400">Merged on {new Date(pr.mergedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

