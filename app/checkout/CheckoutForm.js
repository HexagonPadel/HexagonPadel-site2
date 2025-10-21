"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import Image from "next/image"; // Importation de l'image de Next.js

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function CheckoutForm({ clientInfo }) {
  const stripe = useStripe();
  const elements = useElements();

  const [panier, setPanier] = useState([]);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(storedPanier);
  }, []);
  const elementStyles = {
    style: {
      base: {
        fontSize: "14px",
        color: "#1f2937",
        fontFamily: '"Inter", sans-serif',
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#4b5563",
          fontSize: "13px",
        },
      },
      invalid: {
        color: "#e53e3e",
      },
    },
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    const champsRequis = ["email", "prenom", "nom", "adresse", "codePostal", "ville", "pays"];
    const champsManquants = champsRequis.filter((champ) => !clientInfo?.[champ]);

    if (champsManquants.length > 0) {
      setFormError("Merci de remplir tous les champs d'information avant de procéder au paiement.");
      return;
    }

    if (!stripe || !elements) {
      console.log("Frontend CheckoutForm: Stripe or Elements not loaded");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.log("Frontend CheckoutForm: Card Element is not available");
      return;
    }

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          panier: JSON.parse(localStorage.getItem("panier")),
          clientInfo: clientInfo,
        }),
      });

      const jsonResponse = await response.json();
      const { clientSecret, invoiceId, invoiceUrl } = jsonResponse;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.log("Frontend CheckoutForm: Payment failed:", error.message);
        setPaymentError(error.message);
        setPaymentSuccess(null);
        setLoading(false);
        window.location.href = "/checkout/paymentFail";
      } else if (paymentIntent.status === "succeeded") {
        setPaymentSuccess("");
        setPaymentError(null);

        try {
          const generateResponse = await fetch("/api/generate-invoice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clientInfo: clientInfo,
              panier: panier,
              total_ht: panier.reduce((total, item) => total + item.prix_total * 0.8333333333333334, 0),
              total_tva: panier.reduce((total, item) => total + item.prix_total * 0.16666666666666666, 0),
              total_ttc: panier.reduce((total, item) => total + item.prix_total, 0),
              date: new Date().toISOString(),
            }),
          });

          const generateJson = await generateResponse.json();
          const publicPdfUrl = generateJson.pdfUrl;

          if (publicPdfUrl) {
            window.open(publicPdfUrl, "_blank");

            try {
              await fetch("/api/insert-commande", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  clientInfo,
                  panier,
                  total_ht: panier.reduce((total, item) => total + item.prix_total * 0.8333333333333334, 0),
                  total_tva: panier.reduce((total, item) => total + item.prix_total * 0.16666666666666666, 0),
                  total_ttc: panier.reduce((total, item) => total + item.prix_total, 0),
                  code_promo: null,
                  invoice_id: invoiceId,
                  invoice_url: invoiceUrl,
                  date_commande: new Date().toISOString(),
                }),
              });
            } catch (err) {
              console.error("Erreur lors de l'enregistrement dans Supabase:", err);
            }

            const encodedUrl = encodeURIComponent(publicPdfUrl);
            setTimeout(() => {
              window.location.href = `/thankyou?pdfUrl=${encodedUrl}`;
            }, 10);

            localStorage.removeItem("panier");
          } else {
            console.error("❌ PDF URL manquante dans la réponse !");
          }
        } catch (err) {
          console.error("Frontend CheckoutForm:Erreur lors de la génération de la facture :", err);
        }
      }
    } catch (error) {
      console.log("Frontend CheckoutForm: Error during payment:", error);
      setPaymentError("Erreur lors du paiement : " + error.message);
      setPaymentSuccess(null);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-0">
      {formError && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {formError}
        </div>
      )}

      <form onSubmit={handlePayment}>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 mt-8">
              <label className="text-sm font-medium">Numéro de carte</label>
              <Image
                src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/logos-icons//logos-cards.svg"
                alt="Cartes acceptées"
                className="h-8 -mt-10"
                width={32}  // Largeur de l'image
                height={32} // Hauteur de l'image
              />
            </div>
            <div className="border border-gray-300 p-3 rounded-lg">
              <CardNumberElement options={{ ...elementStyles, placeholder: "4242 4242 4242 4242" }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiration</label>
              <div className="border border-gray-300 p-3 rounded-lg">
                <CardExpiryElement options={{ ...elementStyles, placeholder: "12 / 34" }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVC</label>
              <div className="border border-gray-300 p-3 rounded-lg">
                <CardCvcElement options={{ ...elementStyles, placeholder: "123" }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V7a4 4 0 10-8 0v3m-2 0a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6z" />
            </svg>
            <span>Sécurisé et chiffré via SSL</span>
          </div>

          {paymentError && <p className="text-red-500 text-sm">{paymentError}</p>}
          {paymentSuccess && <p className="text-green-600 text-sm">{paymentSuccess}</p>}

          <button
            type="submit"
            className="btn-hero"
            disabled={!stripe || loading}
          >
            {loading ? "Paiement en cours..." : "Payer et confirmer la commande"}
          </button>
        </div>
      </form>
    </div>
  );
}