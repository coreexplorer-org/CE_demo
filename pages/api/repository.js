export default function handler(req, res) {
  res.status(200).json({
    name: "bitcoin/bitcoin",
    description: "Bitcoin Core integration/staging tree",
    url: "https://github.com/bitcoin/bitcoin",
  })
}

