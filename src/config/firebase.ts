import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let cachedAuth: Auth | null = null;

export async function getFirebaseAuth(): Promise<Auth> {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth is only available on client side");
  }

  if (cachedAuth) return cachedAuth;

  if (getApps().length > 0) {
    cachedAuth = getAuth(getApp());
    return cachedAuth;
  }

  const res = await fetch("/api/auth/firebase-config");
  if (!res.ok) {
    throw new Error("Failed to load Firebase configuration");
  }
  const config = await res.json();
  const app = initializeApp(config);
  cachedAuth = getAuth(app);
  return cachedAuth;
}
