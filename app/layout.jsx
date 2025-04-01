import "./globals.css";

export const metadata = {
  title: "Bitcoin Core Explorer",
  description: "Explore Bitcoin Core's development workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <footer className="bg-gray-800 border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>Bitcoin Core Explorer &copy; {new Date().getFullYear()}</p>
            <p className="text-sm mt-2">
              <span className="text-orange-400">₿</span> Cypherpunks write code
            </p>
            <a
              href="https://github.com/realjuangalt/core_explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 text-sm mt-2 inline-block"
            >
              View on GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
