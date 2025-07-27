import React from "react";

export default function Footer() {
  return (
    <footer className="text-center text-sm py-6 border-t border-gray-300 mt-10">
      <p className="text-gray-500">
        © 2025 github-stats-generator · Built with{" "}
        <span className="text-purple-500">💜</span> by{" "}
        <a
          href="https://your-portfolio-link.com" // replace with your actual portfolio URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 font-medium hover:underline"
        >
          Paul Obiero
        </a>
      </p>
    </footer>
  );
}
