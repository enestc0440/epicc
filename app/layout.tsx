import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Add Monaco editor worker configuration
export const metadata: Metadata = {
  title: "CyberQuery - Advanced Cybersecurity Platform",
  description: "A comprehensive cybersecurity toolkit with advanced features",
    generator: 'v0.dev'
}

// Add this script to the head to fix Monaco editor worker issues
const monacoWorkerScript = `
  self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
      if (label === 'json') {
        return '/monaco-editor/json.worker.js';
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return '/monaco-editor/css.worker.js';
      }
      if (label === 'html' || label === 'handlebars' || 'razor') {
        return '/monaco-editor/html.worker.js';
      }
      if (label === 'typescript' || label === 'javascript') {
        return '/monaco-editor/ts.worker.js';
      }
      return '/monaco-editor/editor.worker.js';
    }
  };
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: monacoWorkerScript }} />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
