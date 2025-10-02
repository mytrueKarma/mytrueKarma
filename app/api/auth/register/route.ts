import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // In a real app, you would:
    // 1. Validate email format and password strength
    // 2. Check if user already exists
    // 3. Hash the password
    // 4. Save user to database
    // 5. Generate JWT tokens

    if (email && password) {
      // Mock successful registration
      const mockUser = {
        id: Date.now().toString(),
        email,
        firstName: firstName || "New",
        lastName: lastName || "User",
      }

      // Mock JWT tokens
      const mockTokens = {
        access: "mock-access-token-" + Date.now(),
        refresh: "mock-refresh-token-" + Date.now(),
        user: mockUser,
      }

      return NextResponse.json(mockTokens, { status: 201 })
    } else {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
  } catch (error) {
    console.error("Registration API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
