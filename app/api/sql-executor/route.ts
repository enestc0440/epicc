import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { query, fileIds } = data

    if (!query) {
      return NextResponse.json({ error: "No SQL query provided" }, { status: 400 })
    }

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return NextResponse.json({ error: "No database files specified" }, { status: 400 })
    }

    // In a real implementation, we would execute the SQL query against the specified files
    // For now, we'll return mock results based on the query

    const results = mockQueryResults(query, fileIds)

    return NextResponse.json({
      success: true,
      query,
      fileIds,
      results,
    })
  } catch (error) {
    console.error("Error executing SQL query:", error)
    return NextResponse.json({ error: "Failed to execute SQL query" }, { status: 500 })
  }
}

// Mock function to generate query results based on the SQL query
function mockQueryResults(query: string, fileIds: string[]) {
  const lowerQuery = query.toLowerCase()

  // Check if it's a SELECT query
  if (lowerQuery.includes("select")) {
    const table = extractTableName(lowerQuery)

    // Generate mock data based on the table name
    if (table === "users") {
      return {
        columns: ["id", "name", "email", "created_at"],
        rows: [
          { id: 1, name: "John Doe", email: "john@example.com", created_at: "2023-01-15T10:30:00Z" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2023-02-20T14:45:00Z" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2023-03-05T09:15:00Z" },
        ],
        rowCount: 3,
        executionTime: "0.023s",
      }
    } else if (table === "products") {
      return {
        columns: ["id", "name", "price", "stock"],
        rows: [
          { id: 1, name: "Laptop", price: 999.99, stock: 45 },
          { id: 2, name: "Smartphone", price: 699.99, stock: 120 },
          { id: 3, name: "Headphones", price: 149.99, stock: 78 },
        ],
        rowCount: 3,
        executionTime: "0.018s",
      }
    } else {
      return {
        columns: ["id", "value"],
        rows: [
          { id: 1, value: "Sample data 1" },
          { id: 2, value: "Sample data 2" },
        ],
        rowCount: 2,
        executionTime: "0.015s",
      }
    }
  }
  // Check if it's an INSERT query
  else if (lowerQuery.includes("insert")) {
    return {
      affectedRows: 1,
      lastInsertId: Math.floor(Math.random() * 1000) + 100,
      executionTime: "0.012s",
    }
  }
  // Check if it's an UPDATE query
  else if (lowerQuery.includes("update")) {
    return {
      affectedRows: Math.floor(Math.random() * 10) + 1,
      executionTime: "0.017s",
    }
  }
  // Check if it's a DELETE query
  else if (lowerQuery.includes("delete")) {
    return {
      affectedRows: Math.floor(Math.random() * 5) + 1,
      executionTime: "0.014s",
    }
  }
  // Default response for other queries
  else {
    return {
      message: "Query executed successfully",
      executionTime: "0.020s",
    }
  }
}

// Helper function to extract table name from a SQL query
function extractTableName(query: string): string {
  // This is a very simplified extraction - a real implementation would use proper SQL parsing
  const fromMatch = query.match(/from\s+(\w+)/i)
  if (fromMatch && fromMatch[1]) {
    return fromMatch[1]
  }

  const insertMatch = query.match(/insert\s+into\s+(\w+)/i)
  if (insertMatch && insertMatch[1]) {
    return insertMatch[1]
  }

  const updateMatch = query.match(/update\s+(\w+)/i)
  if (updateMatch && updateMatch[1]) {
    return updateMatch[1]
  }

  const deleteMatch = query.match(/delete\s+from\s+(\w+)/i)
  if (deleteMatch && deleteMatch[1]) {
    return deleteMatch[1]
  }

  return "unknown"
}
