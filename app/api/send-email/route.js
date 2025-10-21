// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Hexagon Padel <contact@hexagonpadel.eu>',
      to: 'contact@hexagonpadel.eu',
      subject: body.subject || 'Nouveau message via Resend',
      html: `<strong>Nom :</strong> ${body.name}<br/>
             <strong>Email :</strong> ${body.email}<br/>
             <strong>Message :</strong><br/>${body.message}`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}