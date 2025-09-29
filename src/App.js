// LandingPage.jsx
// Seirin Services — Landing Page (React + Tailwind)
// Dark premium + glassmorphism + pricing adapté aux écoles + WhatsApp CTA

import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
  { title: 'Sites web sur-mesure', desc: 'Performants, responsives et optimisés SEO.' },
  { title: 'Design & Branding', desc: 'Identité visuelle forte et adaptée à l’école.' },
  ];

const TESTIMONIALS = [
  { name: '// nom client preuve', text: "//Seirin a transformé notre site — +78% de contacts qualifiés." },
];

/* -------------------------- Lead Form -------------------------- */
function LeadForm({ onSuccess, endpoint = '/api/leads', compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '', budget: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => { if (submitted) emailRef.current?.focus?.(); }, [submitted]);

  const validate = () => {
    if (!form.name || !form.email) return "Le nom et l'email sont requis.";
    const emailR = /^\S+@\S+\.\S+$/;
    if (!emailR.test(form.email)) return 'Email invalide.';
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        onSuccess?.(data);
        window.dataLayer?.push?.({ event: 'lead_submitted', lead: { email: form.email, company: form.company } });
      } else {
        setError(data?.message || "Erreur lors de l'envoi, réessayez.");
      }
    } catch (err) {
      setError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-lg bg-white/6 backdrop-blur-md border border-white/5">
        <h4 className="font-semibold text-lg">Merci — votre demande est reçue</h4>
        <p className="mt-2 text-sm text-white/75">Nous vous contacterons sous 24h. Téléchargez notre guide :</p>
  <a href="/assets/Seirin-LeadMagnet.pdf" download className="inline-block mt-4 bg-gradient-to-b from-black to-blue-600 text-white px-4 py-2 rounded-full font-medium">
          Télécharger le guide
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${compact ? 'text-sm' : ''}`} aria-live="polite">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/85">Nom complet *</label>
        <input id="name" name="name" value={form.name} onChange={handleChange}
          className="mt-1 block w-full rounded-xl bg-white/4 backdrop-blur-md px-3 py-2 border border-white/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Joseph Banza" required />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/85">Email *</label>
        <input id="email" name="email" ref={emailRef} value={form.email} onChange={handleChange}
          className="mt-1 block w-full rounded-xl bg-white/4 backdrop-blur-md px-3 py-2 border border-white/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="email@exemple.com" type="email" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white/85">École / Organisation</label>
          <input id="company" name="company" value={form.company} onChange={handleChange}
            className="mt-1 block w-full rounded-xl bg-white/4 backdrop-blur-md px-3 py-2 border border-white/6" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/85">Téléphone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange}
            className="mt-1 block w-full rounded-xl bg-white/4 backdrop-blur-md px-3 py-2 border border-white/6" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/85">Brève description</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={3}
          className="mt-1 block w-full rounded-xl bg-white/4 backdrop-blur-md px-3 py-2 border border-white/6"
          placeholder="En quoi pouvons-nous vous aider ?"></textarea>
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-b from-black to-blue-600 hover:from-blue-700 hover:to-blue-800 px-5 py-2 rounded-full text-white font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30">
          {loading ? 'Envoi...' : 'Demander un audit gratuit'}
        </button>
        <button type="button" onClick={() => { setForm({ name: '', email: '', company: '', phone: '', message: '', budget: '' }); setError(''); }}
          className="px-4 py-2 rounded-full bg-white/6 text-white/90 border border-white/6">
          Réinitialiser
        </button>
      </div>
    </form>
  );
}

/* -------------------------- Main Component -------------------------- */

export default function LandingPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [leadResponse, setLeadResponse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Seirin Services — Sites web & Design pour Écoles (Lubumbashi)';
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Seirin Services : sites web modernes et branding pour écoles et PME à Lubumbashi. Audit gratuit.';
    if (!document.querySelector('meta[name="description"]')) document.head.appendChild(meta);
  }, []);

  const openModal = () => setModalOpen(true);
  const handleSuccess = (data) => { setLeadResponse(data); setModalOpen(false); };

  // WhatsApp link you provided
  const whatsappLink = "https://wa.me/message/3VM4BJPUGID7K1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020204] via-[#04060a] to-[#05030a] text-white font-sans">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50">
  <div className="max-w-7xl mx-auto px-6 flex items-center justify-between backdrop-blur-md bg-white/10 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg border border-white/6">
              <span className="font-bold text-lg">S</span>
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">Seirin Services</div>
              <div className="text-xs text-white/60">Sites & Branding — Écoles Lubumbashi</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#about" className="hover:text-white transition">A Propos</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#pricing" className="hover:text-white transition">Prix</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <button onClick={openModal} className="ml-4 px-4 py-2 rounded-full bg-gradient-to-b from-black to-blue-600 shadow-md text-white text-sm">
              Demander un audit
            </button>
          </nav>

          {/* Mobile CTA + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Ouvrir le menu" className="p-2 rounded-lg bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="white" viewBox="0 0 24 24"><path d="M16.5 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zM17 12v2a1 1 0 01-1 1h-2l-4-4V9l4 4h2a1 1 0 011 1z" /></svg>
            </a>
          </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 flex justify-end md:hidden">
            <div className="w-64 bg-[#071018] h-full p-6 flex flex-col gap-6 shadow-2xl backdrop-blur-lg">
              <button aria-label="Fermer" onClick={() => setMobileMenuOpen(false)} className="self-end text-white/70 mb-4">
                ✕
              </button>
              <a href="#about" className="py-2 px-4 rounded hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>À propos</a>
              <a href="#services" className="py-2 px-4 rounded hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#pricing" className="py-2 px-4 rounded hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Prix</a>
              <a href="#contact" className="py-2 px-4 rounded hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <button onClick={() => { openModal(); setMobileMenuOpen(false); }} className="mt-4 px-4 py-2 rounded-full bg-gradient-to-b from-black to-blue-600 text-white shadow-md">Demander un audit</button>
            </div>
          </div>
        )}
        </div>
      </header>

      {/* Hero */}
      <main className="pt-28">
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-28">
            {/* Left - copy */}
            <div className="space-y-6">
              <p className="text-sm text-white/60 uppercase tracking-wider">Let's talk design</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Un site professionnel, <br />une notoriété assurée.</h1>
              <p className="text-lg text-white/80 max-w-xl">
                Nous concevons des expériences utilisateurs pour les écoles et PME de Lubumbashi — design premium, conversion optimisée et outils pratiques (inscriptions, calendrier scolaire, communication parentale).
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <button onClick={openModal} className="inline-flex items-center gap-3 bg-gradient-to-b from-black to-blue-600 px-6 py-3 rounded-full text-white font-semibold shadow-2xl hover:scale-[1.02] transition">
                  Obtenir un audit gratuit
                </button>
                <a href="#pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/6 text-white/95 border border-white/6 hover:bg-white/8 transition">
                  Voir nos offres
                </a>
              </div>

              <div className="mt-6 flex gap-4">
                {/* Témoignages supprimés */}
              </div>
            </div>

            {/* Right - decorative / mockup-like visual */}
            <div className="relative flex items-center justify-center">
              {/* Decorative glass card with radial glow to mimic the mockup graphic */}
              <div className="w-full max-w-lg aspect-[4/3] rounded-3xl bg-gradient-to-br from-black/50 to-white/5 border border-white/6 backdrop-blur-[6px] p-6 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700/45 via-blue-600/20 to-transparent opacity-90 flex items-center justify-center">
                  {/* Simple stylized SVG representation of the SWOT-like petals */}
                  <svg viewBox="0 0 360 300" className="w-full h-full p-4" preserveAspectRatio="xMidYMid meet" aria-hidden>
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0" stopColor="#1e3a8a" stopOpacity="0.95" />
                        <stop offset="1" stopColor="#4f46e5" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>

                    {/* Four petals */}
                    <g filter="url(#f1)">
                      <ellipse cx="180" cy="80" rx="90" ry="45" fill="url(#g1)" opacity="0.9" />
                      <ellipse cx="260" cy="160" rx="90" ry="45" fill="url(#g1)" opacity="0.85" transform="rotate(45 260 160)" />
                      <ellipse cx="180" cy="240" rx="90" ry="45" fill="url(#g1)" opacity="0.8" transform="rotate(180 180 240)" />
                      <ellipse cx="100" cy="160" rx="90" ry="45" fill="url(#g1)" opacity="0.85" transform="rotate(-45 100 160)" />
                    </g>

                    {/* Center text */}
                    <text x="50%" y="50%" textAnchor="middle" fill="#e6eefb" fontSize="16" fontWeight="700">Votre école mérite une image mémorable</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* subtle bottom separator */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </section>

        {/* About / value props */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/4 backdrop-blur-md rounded-2xl p-6 border border-white/6">
              <h4 className="font-semibold text-lg">Design centré utilisateur</h4>
              <p className="mt-2 text-sm text-white/80">Des interfaces claires, adaptées aux parents, enseignants et administrateurs.</p>
            </div>
            <div className="bg-white/4 backdrop-blur-md rounded-2xl p-6 border border-white/6">
              <h4 className="font-semibold text-lg">Performance & SEO</h4>
              <p className="mt-2 text-sm text-white/80">Sites rapides, indexables et pensés pour la conversion des inscriptions.</p>
            </div>
            <div className="bg-white/4 backdrop-blur-md rounded-2xl p-6 border border-white/6">
              <h4 className="font-semibold text-lg">Support local</h4>
              <p className="mt-2 text-sm text-white/80">Accompagnement et formation pour la gestion du site, en français/lingala.</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Nos services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white/4 backdrop-blur-md rounded-2xl p-6 border border-white/6 hover:scale-[1.02] transition-transform">
                <h4 className="font-semibold text-lg">{s.title}</h4>
                <p className="mt-3 text-sm text-white/80">{s.desc}</p>
                <div className="mt-4">
                  <button onClick={openModal} className="px-4 py-2 rounded-full bg-gradient-to-b from-black to-blue-600 text-white text-sm">En savoir plus</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing (Web + Design) */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Nos offres adaptées aux écoles — Lubumbashi</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Web Plans */}
            {[
              { title: 'Basic', price: '80$', bullets: ['Site vitrine 3 pages', 'Responsive mobile', 'Formulaire simple', 'Galerie photos', 'SEO basique'] },
              { title: 'Standard', price: '160$', bullets: ['Site 5 pages', 'Formulaire + inscription', 'Blog / actualités', 'SEO complet', 'Hébergement 3 mois', 'Support 1 mois'] },
              { title: 'Premium', price: '200$', bullets: ['Site 8-10 pages', 'Fonctions avancées (inscriptions/ calendrier)', 'Design sur-mesure', 'SEO avancé', 'Hébergement 6 mois', 'Maintenance 3 mois'] },
            ].map((p, idx) => (
              <article key={idx} className={`relative p-6 rounded-2xl bg-white/4 backdrop-blur-md border border-white/6 ${idx === 1 ? 'scale-100 shadow-2xl border-2 border-blue-600' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    {idx === 1 && (
                      <span className="mb-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Populaire</span>
                    )}
                    <h4 className="font-bold text-lg">{p.title}</h4>
                  </div>
                  <div className="text-lg font-semibold">{p.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {p.bullets.map((b, i) => <li key={i} className="flex items-start gap-2"><span className="mt-1 text-blue-400">•</span>{b}</li>)}
                </ul>
                <div className="mt-6">
                  <button onClick={openModal} className="w-full px-4 py-2 rounded-full bg-gradient-to-b from-black to-blue-600 text-white font-medium">Demander un devis</button>
                </div>
              </article>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-6">Design / Branding</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Basic', price: '100$', bullets: ['Logo simple', 'Palette couleurs', '1 proposition'] },
              { title: 'Standard', price: '250$', bullets: ['Logo + en-tête', 'Carte de visite', 'Palette & typo', '2 propositions', 'Web & print'] },
              { title: 'Premium', price: '300$', bullets: ['Branding complet', 'Illustrations personnalisées', 'Guide de marque', '3 propositions', 'Support 1 mois'] },
            ].map((p, idx) => (
              <article key={idx} className="p-6 rounded-2xl bg-white/4 backdrop-blur-md border border-white/6">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold">{p.title}</h5>
                  <div className="font-semibold">{p.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {p.bullets.map((b, i) => <li key={i} className="flex items-start gap-2"><span className="mt-1 text-blue-400">•</span>{b}</li>)}
                </ul>
                <div className="mt-6">
                  <button onClick={openModal} className="w-full px-4 py-2 rounded-full bg-gradient-to-b from-black to-blue-600 text-white font-medium">Choisir cette offre</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-8">Contactez-nous</h2>
              <p className="text-white/80 mb-4">Envoyez-nous un message ou demandez un audit gratuit. Nous répondons sous 24h.</p>

              <div className="space-y-3 text-sm">
                <div><strong>Email: </strong><a className="text-blue-400" href="mailto:taigacapitall@gmail.com">taigacapitall@gmail.com</a></div>
                <div><strong>Téléphone: </strong><a className="text-blue-400" href="tel:+243844006223">+243 (0) 844006223</a></div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500 text-white shadow-lg">
                  {/* Icône WhatsApp officielle */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6" fill="white"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.658 4.637 1.904 6.627L4 29l7.627-1.904A12.96 12.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.22-.627-6.01-1.81l-.43-.27-4.53 1.13 1.13-4.53-.27-.43A10.93 10.93 0 015.083 15c0-6.038 4.88-10.917 10.917-10.917S26.917 8.962 26.917 15 22.038 25.917 16 25.917zm5.29-7.13c-.29-.145-1.71-.84-1.974-.936-.265-.097-.458-.145-.65.145-.194.29-.748.936-.917 1.13-.168.194-.338.218-.627.073-.29-.145-1.225-.452-2.335-1.44-.863-.77-1.445-1.72-1.615-2.01-.168-.29-.018-.447.127-.592.13-.13.29-.338.435-.507.145-.168.194-.29.29-.484.097-.194.048-.364-.024-.507-.073-.145-.65-1.57-.89-2.15-.234-.563-.473-.486-.65-.495-.168-.007-.364-.009-.558-.009-.194 0-.507.073-.773.364-.265.29-1.01.984-1.01 2.396 0 1.412 1.032 2.775 1.176 2.967.145.194 2.03 3.1 5.02 4.22.702.302 1.248.482 1.674.616.703.224 1.343.192 1.848.117.564-.084 1.71-.698 1.953-1.37.242-.672.242-1.247.168-1.37-.073-.123-.265-.194-.558-.338z"/></svg>
                  Contacter via WhatsApp
                </a>

                <button onClick={openModal} className="px-4 py-2 rounded-full bg-gradient-to-b from-black to-blue-600 text-white">Demander un audit</button>
              </div>
            </div>

            <div className="bg-white/6 backdrop-blur-md p-6 rounded-2xl border border-white/6">
              <h4 className="font-semibold mb-3">Contact rapide</h4>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500 text-white shadow-lg text-lg font-semibold hover:bg-green-600 active:scale-95 transition-transform duration-200 animate-fadein"
                style={{animation: 'fadein 0.7s'}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.44 0 .06 5.38.06 12c0 2.11.55 4.15 1.61 5.95L0 24l6.25-1.63A11.93 11.93 0 0 0 12.06 24c6.62 0 12-5.38 12-12s-5.44-12-12-12Zm-.16 17.01c-2.1 2.1-4.89 3.26-7.87 3.26-2.01 0-3.97-.54-5.67-1.56l-.41-.24-3.71.97.99-3.61-.26-.44a10.12 10.12 0 0 1-1.55-5.56c0-2.97 1.16-5.77 3.26-7.87A11.07 11.07 0 0 1 12.06 1.9c2.97 0 5.77 1.16 7.87 3.26 2.1 2.1 3.26 4.9 3.26 7.87 0 2.98-1.16 5.77-3.26 7.87Zm-2.27-5.6c-.12-.2-.44-.32-.91-.56s-2.64-1.3-3.05-1.45c-.41-.15-.71-.23-1.01.24-.3.47-1.15 1.45-1.41 1.75-.26.3-.52.34-.94.11-.41-.23-1.74-.64-3.32-2.05-1.23-1.09-2.06-2.44-2.3-2.85-.24-.41-.03-.63.2-.86.21-.21.47-.55.71-.82.24-.27.32-.46.47-.77.15-.31.07-.58-.04-.82-.11-.24-1.01-2.43-1.39-3.33-.36-.86-.73-.74-1.01-.76l-.86-.02c-.3 0-.78.11-1.19.55-.41.44-1.56 1.53-1.56 3.72 0 2.19 1.59 4.31 1.81 4.61.22.3 3.14 4.79 7.61 6.47.73.3 1.29.48 1.73.61.73.23 1.39.2 1.91.12.58-.09 1.79-.73 2.05-1.43.25-.7.25-1.31.17-1.43Z" />
                </svg>
                Discuter sur WhatsApp
              </a>
          
            </div>
          </div>
        </section>

        {/* Footer */}
      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-[#071018]">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Notre Portfolio</h3>

          {/* Projet fictif */}
          <div className="effect-div text-center mb-12 bg-white/5 rounded-2xl p-8 border border-white/10 shadow-lg">
            <h4 className="text-2xl font-semibold mb-4 text-white">Projet : Site d'une école</h4>
            <p className="mb-6 text-white/80">
               site web réalisé pour une école.
            </p>
            <a
              href="https://ecole-lumiere.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-b from-black to-blue-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition font-semibold shadow-lg"
            >
              Voir le site
            </a>
          </div>

          {/* Galerie photos */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="effect-div bg-white/5 shadow-md rounded-xl overflow-hidden border border-white/10 flex justify-center items-center">
              <img
                src="/portfolio/design1.png"
                alt="Design 1"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
            <div className="effect-div bg-white/5 shadow-md rounded-xl overflow-hidden border border-white/10 flex justify-center items-center">
              <img
                src="/portfolio/design2.png"
                alt="Design 2"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
            <div className="effect-div bg-white/5 shadow-md rounded-xl overflow-hidden border border-white/10 flex justify-center items-center">
              <img
                src="/portfolio/design3.png"
                alt="Design 3"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
        <footer className="bg-transparent mt-12 border-t border-white/6 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} Seirin Services — Tous droits réservés. <span className="mx-2">•</span> Lubumbashi
          </div>
        </footer>
      </main>

      {/* Modal for quick audit */}
      {isModalOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm bg-[#071018] border border-white/6 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center">
            <button aria-label="Fermer" onClick={() => setModalOpen(false)} className="self-end text-white/70 mb-2">✕</button>
            <h4 className="text-xl font-bold mb-4">Contact WhatsApp direct</h4>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500 text-white shadow-lg text-lg font-semibold hover:bg-green-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="white"><path d="M16.5 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zM17 12v2a1 1 0 01-1 1h-2l-4-4V9l4 4h2a1 1 0 011 1z" /></svg>
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
