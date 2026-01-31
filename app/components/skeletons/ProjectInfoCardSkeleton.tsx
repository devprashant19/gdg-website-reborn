import React from "react";

export default function ProjectInfoCardSkeleton() {
  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-neutral-800" />
      <div className="p-5">
        <div className="h-6 w-3/4 bg-neutral-800 rounded mb-4" />
        <div className="h-4 w-full bg-neutral-800 rounded mb-2" />
        <div className="h-4 w-5/6 bg-neutral-800 rounded mb-6" />
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-neutral-800 rounded" />
          <div className="h-5 w-12 bg-neutral-800 rounded" />
        </div>
      </div>
    </div>
  );
}