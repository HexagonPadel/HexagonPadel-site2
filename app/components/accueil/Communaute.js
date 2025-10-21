'use client';

import React, { useState } from 'react';

export default function Communaute() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ok, setOk] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOk(''); setErr('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('Email invalide'); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter',
          email,
          message: email, // corps = l’adresse email
          subject: 'inscription à newsletter Hexagon Padel',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) throw new Error(data?.error || 'Échec envoi');
      setOk('Inscription enregistrée.');
      setEmail('');
    } catch (e2) {
      setErr("Impossible d'enregistrer votre inscription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Rejoignez notre communauté</h2>
        <p className="text-gray-400 leading-tight text-l mb-8">
          Inscrivez-vous à notre newsletter pour recevoir en avant-première nos nouveautés et offres exclusives.
        </p>

        {ok && <p className="mb-4 text-green-400">{ok}</p>}
        {err && <p className="mb-4 text-red-400">{err}</p>}

        <form className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 mr-0 sm:mr-4 rounded-sm bg-transparent text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-white w-full sm:w-auto"
            required
          />
          <button type="submit" disabled={isSubmitting} className="btn-hero disabled:opacity-60">
            {isSubmitting ? 'Envoi…' : "S'inscrire"}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pouvez vous désinscrire à tout moment.
        </p>
      </div>
    </section>
  );
}