'use client';

import Image from 'next/image';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <Image
          src="/assets/3.webp"
          alt="404 Error"
          width={400}
          height={400}
          className="mx-auto mb-8"
        />
        <h1 className="text-2xl font-bold mb-4 text-white">Something went wrong!</h1>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <button 
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}