export default function handler(req, res) {
  res.status(200).json([
    {
      uuid: "m123",
      name: "Wladimir J. van der Laan",
      email: "laanwj@gmail.com",
    },
    {
      uuid: "m456",
      name: "Marco Falke",
      email: "marco.falke@tum.de",
    },
    {
      uuid: "m789",
      name: "Pieter Wuille",
      email: "pieter.wuille@gmail.com",
    },
    {
      uuid: "m101",
      name: "Andrew Chow",
      email: "achow101@gmail.com",
    },
  ])
}

