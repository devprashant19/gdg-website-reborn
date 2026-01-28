import { events } from "../../data/events-data";
import { notFound } from "next/navigation";
import React from "react";

// 1. Update the type: params is a Promise now
interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

// 2. Make the component 'async'
export default async function EventDetailPage({ params }: EventDetailPageProps) {
  // 3. Await the params object to extract the ID
  const { id } = await params;

  // 4. Use the ID synchronously in .find()
  // Note: Ensure e.id and id are the same type. 
  // If e.id is a number in your data, use: parseInt(id)
  const event = events.find((e) => e.id === id);

  if (!event) return notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full bg-gray-900/80 rounded-2xl shadow-lg p-8">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded-xl mb-6 border border-gray-800"
        />
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-lg text-gray-400 mb-4">{event.date}</p>
        <p className="mb-6 text-gray-300">{event.description}</p>
        <div className="prose prose-invert max-w-none">
          <p>{event.details}</p>
        </div>
      </div>
    </main>
  );
}