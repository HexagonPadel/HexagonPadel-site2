// app/api/send-precommande-email/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // Mets ça dans ton .env.local

export async function POST(req) {
  const data = await req.json();

  const { produits, montantTotal, email, nomPrenom } = data;

  try {
    const response = await resend.emails.send({
      from: 'Hexagon Padel <contact@hexagonpadel.eu>',
      to: 'contact@hexagonpadel.eu',
      subject: `Nouvelle précommande de ${produits} pour un montant total de ${montantTotal.toFixed(2)}€`,
      html: `<p>Email : ${email}</p><p>Nom : ${nomPrenom || 'Non précisé'}</p><p>Produits : ${produits}</p><p>Total : ${montantTotal.toFixed(2)}€</p>`,
    });

    return new Response(JSON.stringify({ success: true, data: response }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}