"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bar } from "rough-viz";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (artists.length > 0) {
      renderChart();
    }
  }, [artists]);

  const handleFetchTopArtists = async () => {
    if (!session?.accessToken) {
      alert("No access token found. Please sign in first.");
      return;
    }

    try {
      const res = await fetch(
        "https://api.spotify.com/v1/me/top/artists?limit=5",
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch top artists: ${res.status}`);
      }

      const data = await res.json();
      setArtists(data.items || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const renderChart = () => {
    if (artists.length === 0) return;

    new Bar({
      element: "#top-artists-chart",
      data: {
        labels: artists.map((artist) => artist.name),
        values: artists.map((artist) => artist.popularity),
      },
      title: "Top 5 Artists Popularity",
      roughness: 2.5,
      stroke: "black",
      fill: "red",
      highlight: "purple",
      fillStyle: "cross-hatch",
    });
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard 📊</h1>
      <p className="mt-2">See your top artists.</p>

      <button onClick={handleFetchTopArtists} className="btn mt-4">
        Fetch Top Artists
      </button>

      {artists.length > 0 && (
        <>
          <h2 className="mt-4 text-xl font-semibold">Your Top 5 Artists</h2>
          <ul className="mt-2">
            {artists.map((artist) => (
              <li key={artist.id}>
                {artist.name} (Popularity: {artist.popularity})
              </li>
            ))}
          </ul>
          <div id="top-artists-chart" className="mt-6 w-full h-64"></div>
        </>
      )}

      <div className="mt-6 flex flex-col space-y-2">
        <Link href="/" className="btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
