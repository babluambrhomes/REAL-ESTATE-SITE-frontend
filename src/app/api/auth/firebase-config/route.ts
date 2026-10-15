import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.FIREBASE_API_KEY || process.env.API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || process.env.APP_ID || "",
    measurementId: (process.env.FIREBASE_MEASUREMENT_ID || process.env.MEASUREMENT_ID || "").replace(/"/g, ""),
  });
}
