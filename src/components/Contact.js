import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 bg-gray-100 text-center">
      <h3 className="text-3xl font-bold mb-6">Contactez-nous</h3>
      <p className="mb-4">Un projet ? Une question ? Parlons-en !</p>
      <a href="mailto:contact@monentreprise.com" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Envoyer un email
      </a>
    </section>
  );
}
