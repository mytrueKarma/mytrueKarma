// Utility functions for user data handling

export interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

// Get full name from user data
export function getFullName(user: UserData | null): string {
  if (!user) return "Gast";

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (firstName) return firstName;
  if (lastName) return lastName;

  return user.email.split("@")[0]; // Fallback to email username
}

// Get display name (first name or fallback)
export function getDisplayName(user: UserData | null): string {
  if (!user) return "Gast";

  return user.firstName || user.email.split("@")[0];
}

// Get user initials for avatars
export function getUserInitials(user: UserData | null): string {
  if (!user) return "G";

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  if (firstName) return firstName[0].toUpperCase();
  if (lastName) return lastName[0].toUpperCase();

  return user.email[0].toUpperCase();
}

// Mock user data for development (matches profile data)
export const mockUserData: UserData = {
  id: "1",
  email: "anna.mueller@email.com",
  firstName: "Anna",
  lastName: "Müller",
  isAdmin: false,
};
