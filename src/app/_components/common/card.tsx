import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      {children}
    </article>
  );
}
