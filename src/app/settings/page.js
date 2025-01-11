"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Settings ⚙️</h1>
      <p className="mt-2">Customize your Notebookify experience.</p>

      <div className="mt-4 flex flex-col space-y-2">
        <Link href="/" className="btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
