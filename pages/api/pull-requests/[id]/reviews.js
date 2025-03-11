const prReviews = {
  pr123: [
    {
      id: "r123",
      reviewer: {
        uuid: "r123",
        name: "Alice Johnson",
        email: "alice@example.com",
      },
      comment: "Looks good to me. The deduplication logic is clean and efficient. ACK",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-17T14:00:00Z",
    },
    {
      id: "r124",
      reviewer: {
        uuid: "r456",
        name: "Bob Williams",
        email: "bob@example.com",
      },
      comment: "Have you considered using a set instead of a vector for deduplication? It might be more efficient.",
      hasACK: false,
      hasNACK: false,
      createdAt: "2023-01-16T09:30:00Z",
    },
  ],
  pr124: [
    {
      id: "r125",
      reviewer: {
        uuid: "r789",
        name: "Charlie Brown",
        email: "charlie@example.com",
      },
      comment:
        "The exponential backoff implementation looks good, but I think we should cap the maximum retry interval. NACK until this is addressed.",
      hasACK: false,
      hasNACK: true,
      createdAt: "2023-01-17T11:15:00Z",
    },
  ],
  pr125: [
    {
      id: "r126",
      reviewer: {
        uuid: "r123",
        name: "Alice Johnson",
        email: "alice@example.com",
      },
      comment: "This fix works correctly. I tested with various fee rates and the calculation is now accurate. ACK",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-11T13:45:00Z",
    },
  ],
  pr126: [
    {
      id: "r127",
      reviewer: {
        uuid: "r456",
        name: "Bob Williams",
        email: "bob@example.com",
      },
      comment: "The optimization is impressive. I verified the benchmark results and they match what you reported. ACK",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-07T10:20:00Z",
    },
    {
      id: "r128",
      reviewer: {
        uuid: "r789",
        name: "Charlie Brown",
        email: "charlie@example.com",
      },
      comment: "ACK. This is a nice performance improvement with no downsides.",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-07T16:30:00Z",
    },
  ],
}

export default function handler(req, res) {
  const { id } = req.query

  if (!id || !prReviews[id]) {
    return res.status(404).json({ error: "Reviews not found for this PR" })
  }

  res.status(200).json(prReviews[id])
}

