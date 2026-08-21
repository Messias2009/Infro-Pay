import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  type User,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, firestore, handleFirestoreError, OperationType } from "@/lib/firebase-config";
import type { AuthContextType, UserProfile, UserRole } from "@/types/auth";

export const ADMIN_UID = "rsKuyZLn7gbRulIKz5WpxpgqJDo2";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync user profile to Firestore `users` collection
  const syncUserProfile = useCallback(async (firebaseUser: User): Promise<UserProfile | null> => {
    try {
      const userRef = doc(firestore, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      const isSpecialAdmin =
        firebaseUser.uid === ADMIN_UID ||
        firebaseUser.email?.toLowerCase() === "infropayao@gmail.com";
      const now = new Date().toISOString();

      if (!userSnap.exists()) {
        // First login: Initialize new user document
        const initialProfile: UserProfile = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name:
            firebaseUser.displayName ||
            (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Produtor"),
          email: firebaseUser.email || "",
          photoURL: firebaseUser.photoURL || null,
          avatar_url: firebaseUser.photoURL || null,
          role: (isSpecialAdmin ? "admin" : "seller") as UserRole,
          status: "active",
          createdAt: now,
          updatedAt: now,
          lastLoginAt: now,
        };

        await setDoc(userRef, {
          uid: initialProfile.uid,
          name: initialProfile.name,
          email: initialProfile.email,
          photoURL: initialProfile.photoURL,
          role: initialProfile.role,
          status: initialProfile.status,
          createdAt: initialProfile.createdAt,
          updatedAt: initialProfile.updatedAt,
          lastLoginAt: initialProfile.lastLoginAt,
        });

        setProfile(initialProfile);
        return initialProfile;
      } else {
        // Subsequent login: Load existing profile and update lastLoginAt
        const existingData = userSnap.data() as Partial<UserProfile>;
        const mergedRole: UserRole = isSpecialAdmin ? "admin" : existingData.role || "seller";

        const loadedProfile: UserProfile = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name: existingData.name || firebaseUser.displayName || "Produtor",
          email: existingData.email || firebaseUser.email || "",
          photoURL: existingData.photoURL || firebaseUser.photoURL || null,
          avatar_url:
            (existingData as any).avatar_url ||
            existingData.photoURL ||
            firebaseUser.photoURL ||
            null,
          role: mergedRole,
          status: existingData.status || "active",
          createdAt: existingData.createdAt || now,
          updatedAt: now,
          lastLoginAt: now,
          username: existingData.username || null,
          bio: existingData.bio || null,
          social_instagram: existingData.social_instagram || null,
          social_website: existingData.social_website || null,
        };

        // Non-blocking update of timestamp
        updateDoc(userRef, {
          lastLoginAt: now,
          updatedAt: now,
        }).catch((err) => {
          console.warn("Falha ao atualizar timestamp de login no Firestore:", err);
        });

        setProfile(loadedProfile);
        return loadedProfile;
      }
    } catch (error) {
      console.error("Erro ao sincronizar perfil no Firestore:", error);
      handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
      return null;
    }
  }, []);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await syncUserProfile(firebaseUser);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserProfile]);

  const signInWithEmail = useCallback(
    async (email: string, pass: string): Promise<UserCredential> => {
      setLoading(true);
      try {
        const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
        await syncUserProfile(cred.user);
        return cred;
      } finally {
        setLoading(false);
      }
    },
    [syncUserProfile],
  );

  const signUpWithEmail = useCallback(
    async (email: string, pass: string, displayName?: string): Promise<UserCredential> => {
      setLoading(true);
      try {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
        if (displayName && cred.user) {
          await updateProfile(cred.user, { displayName });
        }
        await syncUserProfile(cred.user);
        return cred;
      } finally {
        setLoading(false);
      }
    },
    [syncUserProfile],
  );

  const signInWithGoogle = useCallback(async (): Promise<UserCredential> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const cred = await signInWithPopup(auth, provider);
      await syncUserProfile(cred.user);
      return cred;
    } finally {
      setLoading(false);
    }
  }, [syncUserProfile]);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email.trim());
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error("Erro ao terminar sessão:", err);
    }
  }, []);

  const refreshProfile = useCallback(async (): Promise<UserProfile | null> => {
    if (!auth.currentUser) return null;
    return await syncUserProfile(auth.currentUser);
  }, [syncUserProfile]);

  const refreshSession = useCallback(async (): Promise<void> => {
    if (auth.currentUser) {
      await auth.currentUser.getIdToken(true);
      await refreshProfile();
    }
  }, [refreshProfile]);

  const isExplicitAdmin =
    user?.uid === ADMIN_UID ||
    user?.email?.toLowerCase() === "infropayao@gmail.com" ||
    profile?.role === "admin";
  const role: UserRole | null = isExplicitAdmin
    ? "admin"
    : profile?.role ?? (user ? "seller" : null);
  const isAdmin = isExplicitAdmin;
  const isSeller = role === "seller" || role === "admin";

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    isSeller,
    role,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    resetPassword,
    signOut,
    refreshProfile,
    session: user ? { user } : null,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um <AuthProvider />");
  }
  return context;
}
