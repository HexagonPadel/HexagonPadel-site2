// Fichier : app/api/insert-commande/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("✅ Reçu pour insertion Supabase :", body);

    const {
      clientInfo,
      panier,
      total_ht,
      total_tva,
      total_ttc,
      invoiceId,
      invoiceUrl,
      promoCode = null
    } = body;

    // 🕓 Date à l'heure de Paris (format ISO)
    const dateParisISO = new Date().toLocaleString("sv-SE", {
      timeZone: "Europe/Paris",
      hour12: false,
    }).replace(' ', 'T'); // format 'YYYY-MM-DDTHH:mm:ss'

    const { data, error } = await supabase
      .from('output_commandes_client')
      .insert([
        {
          client_email: clientInfo.email,
          client_prenom: clientInfo.prenom,
          client_nom: clientInfo.nom,
          client_adresse: clientInfo.adresse,
          client_code_postal: clientInfo.codePostal,
          client_ville: clientInfo.ville,
          client_pays: clientInfo.pays,

          billing_prenom: clientInfo.prenom,
          billing_nom: clientInfo.nom,
          billing_adresse: clientInfo.adresse,
          billing_code_postal: clientInfo.codePostal,
          billing_ville: clientInfo.ville,
          billing_pays: clientInfo.pays,

          produits: panier,
          total_ht: total_ht.toFixed(2),
          total_tva: total_tva.toFixed(2),
          total_ttc: total_ttc.toFixed(2),
          code_promo: promoCode,
          invoice_id: invoiceId,
          invoice_url: invoiceUrl,
          date_commande: dateParisISO, // ← champ à ajouter dans Supabase
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ message: "Commande insérée avec succès", data });
  } catch (err) {
    console.error("❌ Erreur insertion Supabase :", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}