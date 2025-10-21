import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); //req.json() est une méthode qui permet de lire le corps de la requête HTTP (le body) envoyé par le client, et de le parser en JSON.
    const { panier, clientInfo } = body; //Cela déstructure l’objet body pour extraire directement les propriétés panier et clientInfo de l’objet reçu.

        // Log pour vérifier le contenu du panier
        console.log("Backend : Panier:", panier);

    // Calcul du montant total
    const totalAmount = panier.reduce(
      (total, item) => total + item.prix_total * 100,
      0
    );

    // 1. Créer un client Stripe avec les infos du client
    const customer = await stripe.customers.create({
      email: clientInfo.email,
      name: `${clientInfo.prenom} ${clientInfo.nom}`,
      address: {
        line1: clientInfo.adresse,
        postal_code: clientInfo.codePostal,
        city: clientInfo.ville,
        country: clientInfo.pays,
      },
    });

    // 2. Créer un PaymentIntent avec metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'eur',
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      metadata: {
        produits: JSON.stringify( //convertit le tableau des produits en une chaîne de caractères JSON pour que Stripe puisse l’enregistrer dans les métadonnées
          panier.map((item) => ({ //crée un tableau d’objets
            nom: item.nom,
            prix: item.prix_total,
            quantite: 1,
          }))
        ),
        email: clientInfo.email,
        client: `${clientInfo.prenom} ${clientInfo.nom}`,
      },
    });


     {/* Stripe ne peux pas faire de facture via PaymentIntent, seulement via CheckoutSessions, avec un formulaire de paiement sur une autre page...
        // 3. Créer une ligne de facture pour chaque produit
        for (const item of panier) {
          try {
            const invoiceItem = await stripe.invoiceItems.create({
              customer: customer.id,
              amount: item.prix_total * 100, // montant en centimes
              currency: 'eur',
              description: item.nom, // Nom du produit
            });
            // Log pour confirmer que la ligne de facture a été créée
            console.log(`Ligne de facture créée pour le produit: ${item.nom}`);
            console.log('Détails de la ligne de facture:', {
              customer: customer.id,
              amount: item.prix_total * 100, // montant en centimes
              currency: 'eur',
              description: item.nom,
              invoiceItemId: invoiceItem.id, // ID de la ligne de facture créée
            });
          } catch (error) {
            console.error('Erreur lors de la création de la ligne de facture pour:', item.nom, error);
          }
        }

    // 4. Créer et finaliser la facture
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true,
    });

    await stripe.invoices.finalizeInvoice(invoice.id);
    */}

    // 5. Retour au frontend avec le client secret pour confirmation du paiement
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        //invoiceId: invoice.id, // ✅ on renvoie l'ID de la facture
        //invoiceUrl: `https://dashboard.stripe.com/test/invoices/${invoice.id}`, // URL de la facture dans Stripe
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Stripe error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }





  
}
