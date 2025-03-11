const prCommits = {
  pr123: [
    {
      id: "c123",
      hash: "a1b2c3d4e5f6",
      shortDescription: "Fix duplicate transactions in listtransactions",
      longDescription:
        "This commit fixes an issue where transactions affecting multiple addresses would appear multiple times in the listtransactions RPC output.\n\nA deduplication step is added to ensure each transaction is only returned once.",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      coAuthors: [],
      createdAt: "2023-01-15T10:00:00Z",
    },
  ],
  pr124: [
    {
      id: "c124",
      hash: "b2c3d4e5f6g7",
      shortDescription: "Add exponential backoff for reconnection",
      longDescription:
        "Implements exponential backoff for peer reconnection attempts to avoid overwhelming the network during outages.",
      author: {
        uuid: "a456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      coAuthors: [],
      createdAt: "2023-01-16T12:30:00Z",
    },
    {
      id: "c125",
      hash: "c3d4e5f6g7h8",
      shortDescription: "Improve connection failure logging",
      longDescription: "Enhances the logging of connection failures to provide more diagnostic information.",
      author: {
        uuid: "a456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      coAuthors: [],
      createdAt: "2023-01-16T13:45:00Z",
    },
  ],
  pr125: [
    {
      id: "c126",
      hash: "d4e5f6g7h8i9",
      shortDescription: "Fix fee calculation in GUI",
      longDescription:
        "Fixes a bug where custom fee rates were not correctly applied in the transaction creation dialog.",
      author: {
        uuid: "a789",
        name: "Bob Johnson",
        email: "bob@example.com",
      },
      coAuthors: [
        {
          uuid: "a101",
          name: "Alice Williams",
          email: "alice@example.com",
        },
      ],
      createdAt: "2023-01-10T08:15:00Z",
    },
  ],
  pr126: [
    {
      id: "c127",
      hash: "e5f6g7h8i9j0",
      shortDescription: "Optimize script verification",
      longDescription:
        "Reduces redundant hash calculations during script verification to improve block validation performance.",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      coAuthors: [
        {
          uuid: "a456",
          name: "Jane Smith",
          email: "jane@example.com",
        },
      ],
      createdAt: "2023-01-05T10:30:00Z",
    },
    {
      id: "c128",
      hash: "f6g7h8i9j0k1",
      shortDescription: "Add benchmarks for block validation",
      longDescription: "Adds benchmarks to measure the performance improvement of the optimized block validation.",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      coAuthors: [
        {
          uuid: "a789",
          name: "Bob Johnson",
          email: "bob@example.com",
        },
      ],
      createdAt: "2023-01-05T11:15:00Z",
    },
  ],
}

export default function handler(req, res) {
  const { id } = req.query

  if (!id || !prCommits[id]) {
    return res.status(404).json({ error: "Commits not found for this PR" })
  }

  res.status(200).json(prCommits[id])
}

