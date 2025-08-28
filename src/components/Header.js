import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md fixed w-full top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">MonEntreprise</h1>
      <nav className="space-x-6">
        <a href="#services" className="hover:text-blue-600">Services</a>
        <a href="#about" className="hover:text-blue-600">À propos</a>
        <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Contact</a>
      </nav>
    </header>
  );
}
