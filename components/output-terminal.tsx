"use client"

import { useRef, useEffect } from "react"

interface OutputTerminalProps {
  content: string
  type: "success" | "error" | "info"
}

const OutputTerminal = ({ content, type }: OutputTerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [content])

  // Check if the content is JSON and format it accordingly
  const formatContent = () => {
    if (!content) return null

    try {
      // Try to parse as JSON
      const jsonData = JSON.parse(content)

      // Check if it's database query results with columns and rows
      if (jsonData.columns && jsonData.rows) {
        return (
          <div className="space-y-2">
            <div className="text-green-400 font-mono text-sm">
              {jsonData.rowCount} row(s) returned in {jsonData.executionTime}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-green-500/30">
                <thead>
                  <tr className="bg-green-900/20">
                    {jsonData.columns.map((column: string, index: number) => (
                      <th
                        key={index}
                        className="px-4 py-2 text-left text-green-400 font-mono text-sm border-b border-green-500/30"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jsonData.rows.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-black/50" : "bg-black/70"}>
                      {jsonData.columns.map((column: string, colIndex: number) => (
                        <td
                          key={colIndex}
                          className="px-4 py-2 text-green-400 font-mono text-sm border-b border-green-500/20"
                        >
                          {row[column] !== null && row[column] !== undefined ? String(row[column]) : "NULL"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      // For other JSON data, format it nicely
      return (
        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{JSON.stringify(jsonData, null, 2)}</pre>
      )
    } catch (e) {
      // Not JSON, return as plain text
      return <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{content}</pre>
    }
  }

  return (
    <div ref={terminalRef} className="bg-black border border-green-500/30 rounded-md p-4 h-[500px] overflow-y-auto">
      {formatContent()}
    </div>
  )
}

export default OutputTerminal
