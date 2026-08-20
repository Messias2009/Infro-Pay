import type { User, UserCredential } from "firebase/auth";

export type UserRole = "user" | "seller" | "admin";
export type UserStatus = "active" | "suspended" | "banned";

export interface UserProfile {
  uid: string;
  id?: string;
  name: string;
  email: string;
  photoURL: string | null;
  avatar_url?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  username?: string | null;
  bio?: string | null;
  social_instagram?: string | null;
  social_website?: string | null;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  role: UserRole | null;
  // Auth action methods
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<UserProfile | null>;
  // Compatibility helpers
  session: { user: User | null } | null;
  refreshSession: () => Promise<void>;
}
