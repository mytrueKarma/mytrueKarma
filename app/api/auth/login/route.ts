import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would validate credentials against a database
    if (email && password) {
      // Mock successful login
      const mockUser = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
      }

      // Mock JWT tokens
      const mockTokens = {
        access: "mock-access-token-" + Date.now(),
        refresh: "mock-refresh-token-" + Date.now(),
        user: mockUser,
      }

      return NextResponse.json(mockTokens, { status: 200 })
    } else {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
