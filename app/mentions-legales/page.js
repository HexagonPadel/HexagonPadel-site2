import React from "react";
import "../globals.css"; // importe ton fichier global

export default function MentionsLegales() {
  return (
    <main className="bg-bg-slate-50 text-graphite-dark py-24 px-6 md:px-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif font-medium text-copper-dark mb-12 text-center">
          Mentions légales
        </h1>

        <p className="mb-6 text-lg">
          Le présent site internet est édité par la société{" "}
          <strong>Hexagon Padel</strong>, spécialisée dans la conception, la
          fabrication et la commercialisation de raquettes et accessoires de
          padel. En accédant à ce site, vous reconnaissez avoir pris connaissance
          des présentes mentions légales et vous engagez à les respecter.
        </p>

        <h2 className="text-2xl font-serif font-medium text-copper-light mt-12 mb-4">
          1. Éditeur du site
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Dénomination sociale :</strong> Hexagon Padel
          </li>
          <li>
            <strong>Forme juridique :</strong> SARL
          </li>
          <li>
            <strong>Capital social :</strong> 20000 euros
          </li>
          <li>
            <strong>Siège social :</strong> 44T rue du Dr Boutin, 44190, Clisson
          </li>
          <li>
            <strong>SIRET / SIREN :</strong> 930 982 251
          </li>
          <li>
            <strong>TVA intracommunautaire :</strong> FR60930982251
          </li>
          <li>
            <strong>Directeur de la publication :</strong> Guillaume Giannuzzi
          </li>
          <li>
            <strong>Email :</strong> contact@hexagonpadel.eu
          </li>

        </ul>

        <h2 className="text-2xl font-serif font-medium text-copper-light mt-12 mb-4">
          2. Hébergeur du site
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Nom de l’hébergeur :</strong> IONOS SARL
          </li>
          <li>
            <strong>Adresse :</strong> 7 PLACE DE LA GARE, 57200 SARREGUEMINES
          </li>
          <li>
            <strong>Téléphone et e-mail :</strong> 0970 808 911 info@IONOS.fr
          </li>
        </ul>

        <h2 className="text-2xl font-serif font-medium text-copper-light mt-12 mb-4">
          3. Propriété intellectuelle
        </h2>
        <p className="mb-6">
          Tous les éléments du site (textes, images, graphismes, logo, vidéos)
          sont protégés par le droit d’auteur et la propriété intellectuelle.
          Toute reproduction totale ou partielle sans autorisation écrite est
          strictement interdite.
        </p>

        <h2 className="text-2xl font-serif font-medium text-copper-light mt-12 mb-4">
          4. Données personnelles et cookies
        </h2>
        <p className="mb-6">
          Conformément au RGPD, les données personnelles collectées via ce site
          sont traitées dans le respect de la confidentialité. Vous disposez d’un
          droit d’accès, de rectification et de suppression de vos données.
          L’utilisation des cookies fait l’objet d’un bandeau de consentement
          conforme à la législation.
        </p>

        <h2 className="text-2xl font-serif font-medium text-copper-light mt-12 mb-4">
          5. Responsabilité
        </h2>
        <p className="mb-6">
          Hexagon Padel ne saurait être tenue responsable des dommages directs ou
          indirects résultant de l’utilisation du site ou de l’impossibilité d’y
          accéder. Les informations sont fournies à titre indicatif et peuvent
          être modifiées sans préavis.
        </p>

        <h2 className="text-2xl font-serif font-medium text-copper-light mt-12 mb-4">
          6. Droit applicable
        </h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige, compétence est attribuée aux tribunaux français
          conformément aux dispositions légales en vigueur.
        </p>
      </section>
    </main>
  );
}