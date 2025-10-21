// Fichier : app/api/generate-invoice/route.js
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { createClient } from '@supabase/supabase-js';
import InvoicePDF from '../../components/pdf/InvoicePDF';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("✅ Requête reçue pour génération de PDF :", body);

    const { clientInfo, panier, total_ht, total_tva, total_ttc } = body;

    // 🕓 Date en heure de Paris
    const dateParis = new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const timestamp = new Date(); // toujours en UTC pour le nom de fichier
    const fileName = `facture_${clientInfo.nom}_${timestamp.getTime()}.pdf`;

    // 1. Générer le PDF en mémoire
    const pdfBuffer = await renderToBuffer(
      <InvoicePDF
        clientInfo={clientInfo}
        panier={panier}
        total_ht={total_ht}
        total_tva={total_tva}
        total_ttc={total_ttc}
        date={dateParis} // 🕓 date formatée à Paris
      />
    );

    // 2. Upload dans Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('factures')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('factures').getPublicUrl(fileName);

    return NextResponse.json({ pdfUrl: urlData.publicUrl });
  } catch (err) {
    console.error('❌ Erreur génération PDF :', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}