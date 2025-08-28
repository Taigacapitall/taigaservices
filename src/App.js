import React, { useEffect, useRef, useState } from "react";
import "./index.css";

function App() {
  const canvasRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const waves = Array.from({ length: 6 }, () => ({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 30 + Math.random() * 50,
      speed: 0.005 + Math.random() * 0.01,
      color: `rgba(178,34,34,${0.2 + Math.random() * 0.2})`,
      frequency: 0.002 + Math.random() * 0.003,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#1a0000");
      grad.addColorStop(0.5, "#5a0d0d");
      grad.addColorStop(1, "#2c0000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      waves.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * w.frequency + w.phase) * w.amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 3;
        ctx.stroke();
        w.phase += w.speed;
      });
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Card = ({ title, desc }) => (
    <div className="bg-gray-900/20 backdrop-blur-3xl rounded-3xl p-8 shadow-xl transition-transform duration-200 hover:shadow-[0_25px_50px_rgba(178,34,34,0.7)] hover:scale-105 hover-liquid">
      <h4 className="text-xl font-bold mb-4 text-red-600">{title}</h4>
      <p>{desc}</p>
    </div>
  );

  return (
    <div className="font-montserrat text-white relative min-h-screen overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 -z-20"></canvas>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-red-600 tracking-wide hover:animate-glow">
            Taiga Services
          </h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="hover:text-red-400 transition">Services</a>
            <a href="#about" className="hover:text-red-400 transition">À propos</a>
            <a href="#contact" className="hover:text-red-400 transition">Contact</a>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-red-600"></span>
                <span className="block w-6 h-0.5 bg-red-600"></span>
                <span className="block w-6 h-0.5 bg-red-600"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden bg-black/80 backdrop-blur-md w-full py-4 flex flex-col items-center space-y-4">
            <a href="#services" className="hover:text-red-400 transition" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" className="hover:text-red-400 transition" onClick={() => setMenuOpen(false)}>À propos</a>
            <a href="#contact" className="hover:text-red-400 transition" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 relative overflow-hidden">
        <div className="relative z-10 bg-gray-900/20 backdrop-blur-3xl rounded-3xl p-8 sm:p-16 max-w-md sm:max-w-3xl shadow-[0_15px_50px_rgba(178,34,34,0.5)] hover:shadow-[0_25px_90px_rgba(178,34,34,0.7)] transition-all duration-700">
          
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 animate-fadeIn animate-shine hover:scale-105">
            Bienvenue chez Taiga Services
          </h2>
          
          <p className="text-base sm:text-xl mb-6 animate-fadeIn delay-200">
            Des solutions fluides, interactives et modernes pour booster votre entreprise.
          </p>
            <a
            href="#services"
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-3xl shadow-lg hover:shadow-red-700/80 transition-all duration-300 hover:animate-glow hover:scale-105 hover-liquid w-full sm:w-auto text-center block sm:inline-block"
          >
            Découvrir nos services
          </a>
        </div>
    </section>

      {/* Services Section */}
      <section id="services" className="py-28 max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 gap-10 relative">
        <Card title="Création de sites web" desc="Sites modernes, rapides et responsives." />
        <Card title="Marketing digital" desc="Boostez votre visibilité en ligne." />
        <Card title="Création de visuel" desc="Création de visuel impactant pour vos évènements" />
        <Card title="Support technique" desc="Assistance rapide et fiable pour tous vos besoins IT." />
      </section>

      {/* About Section */}
      <section id="about" className="py-28 max-w-3xl mx-auto px-6 text-center relative">
        <div className="bg-gray-900/20 backdrop-blur-3xl rounded-3xl p-12 shadow-lg animate-slideInUp hover:animate-glow hover-liquid">
          <h3 className="text-3xl font-bold mb-6 text-red-600">À propos de nous</h3>
          <p>
            Taiga Services offre des solutions fluides, modernes et interactives adaptées à vos besoins.
          </p>
        </div>
      </section>

      {/* Contact Section */}
     <section id="contact" className="py-28 max-w-3xl mx-auto px-6 text-center relative">
        <div className="bg-gray-900/20 backdrop-blur-3xl rounded-3xl p-8 sm:p-12 shadow-lg animate-slideInUp delay-200 hover:animate-glow hover-liquid">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-red-600">Contactez-nous</h3>
          
          <p className="mb-4 sm:mb-6 text-base sm:text-lg">
            Envoyez-nous un email à{" "}
            <a href="mailto:taigacapitall@gmail.com" className="text-red-600 hover:underline">
              taigacapitall@gmail.com
            </a>
          </p>
          
          <p className="mb-6 text-base sm:text-lg">
            Numéro de téléphone :{" "}
            <a href="tel:+243844006223" className="text-red-600 hover:underline">
              +243 (0) 844006223 / +243 (0) 816073703
            </a>
          </p>
          
          <a
            href="mailto:taigacapitall@gmail.com"
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-3xl shadow-lg hover:shadow-red-700/80 transition-all duration-300 hover:animate-glow hover:scale-105 hover-liquid w-full sm:w-auto text-center block sm:inline-block"
          >
            Envoyer un message
          </a>
        </div>
      </section>


      <footer className="bg-black/70 backdrop-blur-md py-6 text-center mt-10">
        &copy; {new Date().getFullYear()} Taiga Services. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
