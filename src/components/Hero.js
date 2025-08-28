import React from "react";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h2 className="text-5xl font-bold mb-4">Des services qui font la différence</h2>
      <p className="text-lg mb-6">Nous aidons votre entreprise à grandir avec nos solutions modernes.</p>
      <a href="#services" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100">
        Découvrir nos services
      </a>
    </section>
  );
}
