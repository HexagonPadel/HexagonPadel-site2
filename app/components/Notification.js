"use client";

export default function Notification({ message, show }) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow z-50 animate-bounce">
      {message}
    </div>
  );
}
