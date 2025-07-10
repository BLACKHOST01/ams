import React from "react";

const home = () => {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold text-center">
        Welcome to My Next.js App!
      </h1>
      <p className="text-center mt-4">This is your home page.</p>

      {/* Example Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </main>
  );
};

export default home;
