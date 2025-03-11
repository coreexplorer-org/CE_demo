const pullRequests = {
  open: [
    {
      id: "pr123",
      number: 25000,
      title: "wallet: Avoid duplicate transactions in listtransactions",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      openedAt: "2023-01-15T12:00:00Z",
      status: "open",
    },
    {
      id: "pr124",
      number: 25001,
      title: "net: Improve peer connection handling",
      author: {
        uuid: "a456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      openedAt: "2023-01-16T14:30:00Z",
      status: "open",
    },
  ],
  closed: [
    {
      id: "pr125",
      number: 24990,
      title: "gui: Fix transaction fee calculation",
      author: {
        uuid: "a789",
        name: "Bob Johnson",
        email: "bob@example.com",
      },
      openedAt: "2023-01-10T09:15:00Z",
      closedAt: "2023-01-12T16:45:00Z",
      status: "closed",
    },
  ],
  merged: [
    {
      id: "pr126",
      number: 24980,
      title: "consensus: Optimize block validation",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      openedAt: "2023-01-05T11:30:00Z",
      mergedAt: "2023-01-08T13:20:00Z",
      status: "merged",
    },
  ],
}

export default function handler(req, res) {
  const { status } = req.query

  if (!status || !pullRequests[status]) {
    return res.status(400).json({ error: "Invalid status parameter" })
  }

  res.status(200).json(pullRequests[status])
}

