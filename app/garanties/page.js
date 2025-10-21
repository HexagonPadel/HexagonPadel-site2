export default function GarantiePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Garanties & Engagement qualité Hexagon Padel</h1>
        <p className="mt-4 max-w-3xl text-neutral-600">
          Chez Hexagon Padel, chaque raquette est fabriquée de manière artisanale en France. Malgré un haut niveau de standardisation et un contrôle qualité rigoureux, chaque pièce reste unique. De légères variations d’aspect ou micro-imperfections de surface ne constituent pas un défaut de qualité mais le reflet d’une fabrication artisanale.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-2">
        {/* Garantie légale de conformité */}
        <article className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="text-xl font-medium">Garantie légale de conformité</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            Conformément aux articles L.217-3 et suivants du Code de la consommation, nos raquettes bénéficient de la garantie légale de conformité pendant 2 ans à compter de la livraison.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>Le client peut demander la réparation ou le remplacement du produit non conforme.</li>
            <li>Si ces solutions sont impossibles ou disproportionnées, une réduction de prix ou un remboursement peut être proposé.</li>
            <li>Les défauts apparus dans les 24 mois suivant la livraison sont présumés exister dès la vente.</li>
          </ul>
          <p className="mt-4 text-sm text-neutral-700">
            La garantie ne couvre pas les dommages liés à une mauvaise utilisation, un choc volontaire ou une usure anormale. Une raquette cassée après impact contre une vitre, le sol, un poteau, une autre raquette ou tout autre élément extérieur au jeu normal ne relève pas d’un défaut de conformité.
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Toute demande de remboursement pour défaut de fabrication sera examinée sur la base de photos, de vidéos et d’une analyse de la casse. Le remboursement ou remplacement sera accordé uniquement si Hexagon Padel valide le défaut ou la non-conformité.
          </p>
        </article>

        {/* Garantie des vices cachés */}
        <article className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="text-xl font-medium">Garantie des vices cachés</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            En application des articles 1641 et suivants du Code civil, cette garantie couvre les défauts cachés rendant la raquette impropre à l’usage auquel on la destine.
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Elle ne s’applique pas aux dommages résultant d’une utilisation inadaptée ou excessive. Une raquette utilisée hors de conditions normales de jeu (chocs, conditions climatiques extrêmes, modification du cadre, surchauffe) ne peut donner lieu à remboursement ou remplacement.
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Vous disposez d’un délai de 2 ans à compter de la découverte du vice pour agir. L’analyse du défaut repose sur des preuves visuelles (photos ou vidéos) transmises à Hexagon Padel, qui statue sur la validité de la demande.
          </p>
        </article>

        {/* Garantie commerciale */}
        <article className="rounded-2xl border border-neutral-200 p-6 shadow-sm md:col-span-2">
          <h2 className="text-xl font-medium">Garantie commerciale Hexagon Padel</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            Nous garantissons la qualité de fabrication et la durabilité de nos raquettes dans le cadre d’un usage conforme à la pratique normale du padel. Cette garantie couvre uniquement les défauts de matériaux ou de production. Les casses liées à un usage anormal ne sont pas prises en charge.
          </p>
          <p className="mt-3 text-sm text-neutral-700">
            Chaque demande est analysée individuellement à partir de photos, vidéos ou tout autre élément fourni par le client. Le remboursement ou le remplacement n’est accordé que si nos équipes valident l’existence d’un défaut de fabrication réel.
          </p>
          <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
            <p className="font-medium">Durée</p>
            <p>2 ans à compter de la date d’achat.</p>
            <p className="mt-3 font-medium">Procédure</p>
            <p>Contactez-nous à <a href="mailto:sav@hexagonpaddle.eu" className="underline">sav@hexagonpaddle.eu</a> avec votre numéro de commande, photos du produit, et description du problème. Nous vous guiderons sur la marche à suivre.</p>
          </div>
        </article>

        {/* Médiation */}
        <article className="rounded-2xl border border-neutral-200 p-6 shadow-sm md:col-span-2">
          <h2 className="text-xl font-medium">Médiation de la consommation</h2>
          <p className="mt-3 text-sm text-neutral-700">
            Si un litige persiste après contact avec notre service client, vous pouvez saisir gratuitement le médiateur de la consommation référencé ci-dessous dans un délai d’un an à compter de votre réclamation.
          </p>
          <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
            <p className="font-medium">Médiateur désigné</p>
            <ul className="mt-2 space-y-1">
              <li>Nom&nbsp;: <span className="text-neutral-900">CM2C – Centre de la Médiation de la Consommation de
              Conciliateurs de Justice</span></li>
              <li>Numéro&nbsp;: <span className="text-neutral-900">01 89 47 00 14 (du lundi au vendredi de 9h30 à
                12h00 et de 14h00 à 16h00)</span></li>
              <li>Site&nbsp;: <a href="#" className="underline">www.cm2c.net</a></li>
            </ul>
            <p className="mt-3">Plateforme européenne de règlement en ligne des litiges&nbsp;: <a href="https://ec.europa.eu/consumers/odr/" className="underline">ODR</a>.</p>
          </div>
        </article>

        {/* Infos pratiques */}
        <article className="rounded-2xl border border-neutral-200 p-6 shadow-sm md:col-span-2">
          <h2 className="text-xl font-medium">Informations pratiques</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>Service client&nbsp;: <a href="mailto:sav@hexagonpaddle.eu" className="underline">sav@hexagonpaddle.eu</a></li>
            <li>Adresse de retour&nbsp;: <span className="text-neutral-900">44T rue du Dr Boutin, 44190, Clisson</span></li>
            <li>Droit de rétractation&nbsp;: 14 jours à compter de la réception pour les ventes à distance, sous réserve que le produit soit intact et non utilisé.</li>
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 text-xs text-neutral-500">
        <p>
          Cette page résume les garanties légales et commerciales applicables. Hexagon Padel se réserve le droit d’examiner chaque demande afin de vérifier la conformité de l’usage déclaré avec les conditions normales d’utilisation d’une raquette de padel.
        </p>
      </section>
    </main>
  );
}