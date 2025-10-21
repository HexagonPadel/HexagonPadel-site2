'use client';  // Ajoute cette ligne en haut de ton fichier

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Une erreur est survenue lors de l\'envoi du message');
      }

      const data = await res.json();
      setSuccessMessage('Votre message a été envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMessage(error.message || 'Quelque chose s\'est mal passé');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 md:px-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-left">
          Nous contacter
        </h1>
        <p className="text-graphite mb-10 text-left">
          Une question, une demande ou une envie de collaborer ? Remplissez le formulaire ci-dessous et nous reviendrons vers vous rapidement.
        </p>
        
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 mb-6 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-md">
            {errorMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-graphite">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-graphite">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-graphite">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}