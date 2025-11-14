"use client";
import { useEffect, useState } from "react";

export default function Analytics() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        setVisits(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-200 text-black dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-gray-950 dark:text-white px-6 py-20 relative overflow-visible">

      <h1 className="text-6xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-400 via-green-500 to-green-700 text-transparent bg-clip-text drop-shadow-lg leading-tight">
        Fluxly Analytics
      </h1>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading analytics...</p>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 animate-floatUp">

          {/* Total Events */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-gray-100 text-gray-800 dark:from-gray-800/40 dark:to-gray-900/50 dark:text-gray-300 backdrop-blur-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Total Visits</h2>
            <p className="text-5xl font-extrabold text-green-500">
              {visits.length}
            </p>
          </div>

          {/* Unique Visitors */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-gray-100 text-gray-800 dark:from-gray-800/40 dark:to-gray-900/50 dark:text-gray-300 backdrop-blur-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Unique Visitors</h2>
            <p className="text-5xl font-extrabold text-green-500">
              {[...new Set(visits.map(v => v.ip))].length}
            </p>
          </div>

          {/* Countries */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-gray-100 text-gray-800 dark:from-gray-800/40 dark:to-gray-900/50 dark:text-gray-300 backdrop-blur-xl shadow-lg sm:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Top Countries</h2>
            <div className="space-y-2">
              {Object.entries(
                visits.reduce((acc, v) => {
                  acc[v.country] = (acc[v.country] || 0) + 1;
                  return acc;
                }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([country, count], i) => (
                  <p key={i} className="text-lg">
                    <span className="font-semibold">{country || "Unknown"}:</span>{" "}
                    {count}
                  </p>
                ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}