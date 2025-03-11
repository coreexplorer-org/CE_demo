const pullRequestDetails = {
  pr123: {
    id: "pr123",
    number: 25000,
    title: "wallet: Avoid duplicate transactions in listtransactions",
    description:
      "This PR fixes an issue with duplicate transactions appearing in the listtransactions RPC call.\n\n**Problem:**\nWhen a transaction affects multiple addresses in the wallet, it can appear multiple times in the listtransactions output.\n\n**Solution:**\nAdd a deduplication step that ensures each transaction is only returned once.",
    author: {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
    },
    openedAt: "2023-01-15T12:00:00Z",
    status: "open",
  },
  pr124: {
    id: "pr124",
    number: 25001,
    title: "net: Improve peer connection handling",
    description:
      "Enhances the peer connection handling to be more resilient to network disruptions.\n\n- Adds exponential backoff for reconnection attempts\n- Improves logging of connection failures\n- Adds unit tests for the new functionality",
    author: {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    openedAt: "2023-01-16T14:30:00Z",
    status: "open",
  },
  pr125: {
    id: "pr125",
    number: 24990,
    title: "gui: Fix transaction fee calculation",
    description:
      "Fixes a bug in the GUI where transaction fees were incorrectly calculated when using custom fee rates.",
    author: {
      uuid: "a789",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    openedAt: "2023-01-10T09:15:00Z",
    closedAt: "2023-01-12T16:45:00Z",
    status: "closed",
  },
  pr126: {
    id: "pr126",
    number: 24980,
    title: "consensus: Optimize block validation",
    description:
      "This PR optimizes the block validation process to improve performance.\n\n```\nBenchmark results:\nBefore: 1.2s per block\nAfter: 0.8s per block\n```\n\nThe optimization focuses on reducing redundant hash calculations during script verification.",
    author: {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
    },
    openedAt: "2023-01-05T11:30:00Z",
    mergedAt: "2023-01-08T13:20:00Z",
    status: "merged",
  },
}

export default function handler(req, res) {
  const { id } = req.query

  if (!id || !pullRequestDetails[id]) {
    return res.status(404).json({ error: "Pull request not found" })
  }

  res.status(200).json(pullRequestDetails[id])
}

