// Seirin Services — Landing Page (React + Tailwind)

import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
  { title: 'Sites web sur-mesure', desc: 'Performants, responsives et optimisés SEO.' },
  { title: 'Design & Branding', desc: 'Identité visuelle pour marquer les esprits.' },
  { title: 'Marketing digital', desc: 'Acquisition ciblée et suivie des conversions.' },
];

const TESTIMONIALS = [
  { name: 'Marie K.', text: "Seirin a transformé notre site — +78% de contacts qualifiés." },
  { name: 'Koffi T.', text: "Professionnels, rapides et très pros sur le suivi." },
];

function LeadForm({ onSuccess, endpoint = '/api/leads', compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '', budget: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => { if (submitted) emailRef.current?.focus?.(); }, [submitted]);

  const validate = () => {
    if (!form.name || !form.email) return 'Le nom et l\'email sont requis.';
    const emailR = /^\S+@\S+\.\S+$/;
    if (!emailR.test(form.email)) return 'Email invalide.';
    return null;
  };

  const handleChange = (e) => { const { name, value } = e.target; setForm(s => ({ ...s, [name]: value })); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { setSubmitted(true); onSuccess?.(data); window.dataLayer?.push?.({ event: 'lead_submitted', lead: { email: form.email, company: form.company } }); }
      else setError(data?.message || 'Erreur lors de l\'envoi, réessayez.');
    } catch (err) { setError('Erreur réseau.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md">
      <h4 className="font-bold text-lg">Merci — Votre demande est reçue</h4>
      <p className="mt-2 text-sm">Un membre de l'équipe Seirin vous contactera sous 24h. Téléchargez notre guide :</p>
      <a href="/assets/Seirin-LeadMagnet.pdf" download className="inline-block mt-4 bg-red-600 px-4 py-2 rounded-md text-white font-semibold">Télécharger le guide</a>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${compact ? 'text-sm' : ''}`} aria-live="polite">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Nom complet *</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md bg-white/10 backdrop-blur-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Ex: Joseph Banza" required />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email *</label>
        <input id="email" name="email" ref={emailRef} value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md bg-white/10 backdrop-blur-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="email@exemple.com" type="email" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="company" className="block text-sm font-medium">Société</label>
          <input id="company" name="company" value={form.company} onChange={handleChange} className="mt-1 block w-full rounded-md bg-white/10 backdrop-blur-md px-3 py-2" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Téléphone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full rounded-md bg-white/10 backdrop-blur-md px-3 py-2" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">Brève description</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md bg-white/10 backdrop-blur-md px-3 py-2" placeholder="En quoi pouvons-nous vous aider ?"></textarea>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium">Budget estimé (optionnel)</label>
        <select id="budget" name="budget" value={form.budget} onChange={handleChange} className="mt-1 block w-full rounded-md bg-white/10 backdrop-blur-md px-3 py-2">
          <option value="">Sélectionner</option>
          <option value="<500">Moins de 500$</option>
          <option value="500-2000">500$ — 2 000$</option>
          <option value=">2000">Plus de 2 000$</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md font-semibold disabled:opacity-50">{loading ? 'Envoi...' : 'Demander un audit gratuit'}</button>
        <button type="button" onClick={() => { setForm({ name: '', email: '', company: '', phone: '', message: '', budget: '' }); setError(''); }} className="px-3 py-2 rounded-md bg-white/10 backdrop-blur-md">Réinitialiser</button>
      </div>
    </form>
  );
}

export default function LandingPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [leadResponse, setLeadResponse] = useState(null);

  useEffect(() => {
    document.title = 'Seirin Services — Sites web & Design pour PME Congolaises';
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Seirin Services conçoit des sites modernes et des identités visuelles pour PME en RDC. Audit gratuit — contactez-nous.';
    if (!document.querySelector('meta[name="description"]')) document.head.appendChild(meta);
  }, []);

  const openModal = () => { setModalOpen(true); setTimeout(() => document.getElementById('lead-name')?.focus?.(), 40); };
  const handleSuccess = (data) => { setLeadResponse(data); setModalOpen(false); };

  return (
    <div className="font-sans text-white relative min-h-screen overflow-x-hidden bg-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">S</div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">Seirin Services</h1>
              <p className="text-xs text-white/60">Sites web & design pour PME - RDC</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="hover:text-red-300">Services</a>
            <a href="#process" className="hover:text-red-300">Process</a>
            <a href="#portfolio" className="hover:text-red-300">Portfolio</a>
            <a href="#pricing" className="hover:text-red-300">Prix</a>
            <a href="#contact" className="bg-red-600 px-4 py-2 rounded-lg">Contact</a>
          </nav>
          <div className="md:hidden">
            <button onClick={openModal} className="bg-red-600 px-3 py-2 rounded-md">Audit</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center text-center px-6 py-24">
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">Nous créons des sites qui transforment vos visiteurs en clients</h2>
          <p className="text-lg sm:text-xl mb-6 text-white/80">Audit gratuit • Optimisation SEO • Design adapté aux PME Congolaises</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
            <button onClick={openModal} className="bg-red-600 px-6 py-3 rounded-3xl font-semibold shadow-lg hover:scale-[1.02]">Obtenir un audit gratuit</button>
            <a href="#services" className="px-6 py-3 rounded-3xl bg-white/5 self-center">Découvrir nos services</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <article key={s.title} className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-[1.02] transition-transform">
            <h3 className="font-bold text-xl text-red-500 mb-2">{s.title}</h3>
            <p className="text-sm text-white/80">{s.desc}</p>
          </article>
        ))}
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">Notre Portfolio</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform">
              <img src={`https://picsum.photos/400/300?random=${i}`} alt={`Projet ${i}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold mb-1">Projet {i}</h4>
                <p className="text-sm text-white/70">Description rapide du projet scolaire ou PME.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">Nos Offres pour Écoles</h3>

        <h4 className="text-2xl font-semibold mb-6">Web / Développement</h4>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {title:'Basic', desc:['Site vitrine 3 pages','Responsive mobile','Formulaire simple','Galerie photos','SEO basique'], price:'80$'},
            {title:'Standard', desc:['Site 5 pages','Formulaire + inscription','Blog / actualités','SEO complet','Hébergement 3 mois','Support 1 mois'], price:'160$'},
            {title:'Premium', desc:['Site complet 8-10 pages','Fonctions avancées','Design sur-mesure','SEO avancé','Hébergement 6 mois','Maintenance 3 mois','Formation gestion site'], price:'200$'}
          ].map((plan,i)=>(
            <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-[1.02] transition-transform">
              <h4 className="font-bold text-xl text-red-500 mb-2">{plan.title}</h4>
              <ul className="text-sm text-white/80 mb-4 list-disc list-inside">{plan.desc.map((d,j)=><li key={j}>{d}</li>)}</ul>
              <p className="font-semibold text-lg mb-4">{plan.price}</p>
              <button onClick={openModal} className="bg-red-600 px-4 py-2 rounded-md w-full">Demander un devis pour mon école</button>
            </div>
          ))}
        </div>

        <h4 className="text-2xl font-semibold mb-6">Design / Branding</h4>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:'Basic', desc:['Logo simple','Palette couleurs','1 proposition'], price:'100$'},
            {title:'Standard', desc:['Logo + en-tête','Carte de visite','Palette + typographie','2 propositions','Web & print'], price:'250$'},
            {title:'Premium', desc:['Branding complet','Illustrations personnalisées','Guide de marque','3 propositions','Support 1 mois'], price:'300$'}
          ].map((plan,i)=>(
            <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-[1.02] transition-transform">
              <h4 className="font-bold text-xl text-red-500 mb-2">{plan.title}</h4>
              <ul className="text-sm text-white/80 mb-4 list-disc list-inside">{plan.desc.map((d,j)=><li key={j}>{d}</li>)}</ul>
              <p className="font-semibold text-lg mb-4">{plan.price}</p>
              <button onClick={openModal} className="bg-red-600 px-4 py-2 rounded-md w-full">Demander un devis pour mon école</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Lead Form */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contactez-nous</h3>
            <p className="text-sm mb-4">Envoyez-nous un message ou demandez un audit gratuit. Nous répondons sous 24h.</p>
            <div className="space-y-3 text-sm">
              <div><strong>Email: </strong><a href="mailto:taigacapitall@gmail.com" className="text-red-400">taigacapitall@gmail.com</a></div>
              <div><strong>Téléphone: </strong><a href="tel:+243844006223" className="text-red-400">+243 (0) 844006223</a></div>
            </div>
            <div id="thank-you-banner" className="mt-6 p-4 bg-green-600 rounded opacity-0 transition-opacity">Merci — nous avons bien reçu votre demande.</div>
          </div>
          <div>
                <a href="https://wa.me/message/3VM4BJPUGID7K1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zm1 10v2a1 1 0 01-1 1h-2l-4-4V12l4 4h2a1 1 0 011 1z" />
              </svg>
              Contacter via WhatsApp
            </a>
          </div>
        </div>
      </section>

       {/* Footer avec WhatsApp */}
      <footer className="bg-black/60 backdrop-blur-md py-8 mt-8 flex flex-col items-center gap-4">
        
        <div className="text-sm text-center">&copy; 2025 Seirin Services. Tous droits réservés.</div>
      </footer>
    </div>
  );
}
