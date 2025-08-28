import React from "react";

export default function Services() {
  return (
    <section id="services" className="py-16 px-8 text-center">
      <h3 className="text-3xl font-bold mb-8">Nos Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-xl font-semibold mb-4">Service 1</h4>
          <p>Explication du service...</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-xl font-semibold mb-4">Service 2</h4>
          <p>Explication du service...</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-xl font-semibold mb-4">Service 3</h4>
          <p>Explication du service...</p>
        </div>
      </div>
    </section>
  );
}
