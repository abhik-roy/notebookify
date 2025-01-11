"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="text-center">
      <h1 className="text-3xl font-bold">Notebookify 🎶</h1>
      {!session ? (
        <>
          <p className="mt-2">Sign in to see your Spotify stats.</p>
          <button onClick={() => signIn("spotify")} className="btn mt-4">
            Sign In To Spotify
          </button>
        </>
      ) : (
        <>
          <p className="mt-2">Welcome, {session.user?.name}!</p>
          <div className="mt-4 flex flex-col space-y-2">
            <Link href="/dashboard" className="btn">
              Go to Dashboard
            </Link>
            <button onClick={() => signOut()} className="btn bg-red-500">
              Sign Out
            </button>
          </div>
        </>
      )}
    </main>
  );
}
