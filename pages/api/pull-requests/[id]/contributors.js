const prContributors = {
  pr123: [
    {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
      contributionPercentage: 75,
    },
    {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
      contributionPercentage: 25,
    },
  ],
  pr124: [
    {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
      contributionPercentage: 100,
    },
  ],
  pr125: [
    {
      uuid: "a789",
      name: "Bob Johnson",
      email: "bob@example.com",
      contributionPercentage: 90,
    },
    {
      uuid: "a101",
      name: "Alice Williams",
      email: "alice@example.com",
      contributionPercentage: 10,
    },
  ],
  pr126: [
    {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
      contributionPercentage: 60,
    },
    {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
      contributionPercentage: 30,
    },
    {
      uuid: "a789",
      name: "Bob Johnson",
      email: "bob@example.com",
      contributionPercentage: 10,
    },
  ],
}

export default function handler(req, res) {
  const { id } = req.query

  if (!id || !prContributors[id]) {
    return res.status(404).json({ error: "Contributors not found for this PR" })
  }

  res.status(200).json(prContributors[id])
}

