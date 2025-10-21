'use client'
import { motion } from 'framer-motion'

import Hotspots from '../components/Hotspots'


export default function TechnologiesPage() {
  return (
    <div className="bg-slate-50 text-center py-12 px-4">
      {/* Titre */}
      <section className="text-center">
        <span className="badge blue-badge mb-6 py-1.5 px-4 inline-block">
          Technologies
        </span>
        <h1 className="text-4xl font-bold mb-6">
          Un concentré de technologies dans un écrin unique
        </h1>
        <p className="text-graphite text-lg mb-12 max-w-3xl mx-auto">
          Nous avons conçu nos raquettes aux plus hauts standards de performance, sans concessions sur le style pensé dans les moindres détails.
        </p>
      </section>

      {/* Hotspots */}
      <Hotspots />

      {/* Section Cadre Forgé */}
      <section className="py-2 px-6 md:px-20 text-left bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 mt-6 ">
          Cadre en carbone forgé
        </h2>

        <div className="mx-auto grid md:grid-cols-4 gap-12 items-start">
          {/* Texte (3/4) */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex-1">
              <p className="text-graphite mb-4">
                Notre cadre en carbone forgé incarne le summum de l’innovation technique et de l’engagement durable. Contrairement aux cadres classiques en fibre de carbone tissée, nous utilisons ici des fibres courtes, déchiquetées et compactées à haute pression dans un moule chauffé.
              </p>
              <p className="text-graphite mb-4">
                Ces fibres proviennent de chutes de carbone issues de l’industrie aéronautique locale, leur offrant une seconde vie au lieu de finir en déchet. Ce procédé de fabrication, inspiré des technologies de pointe du secteur automobile et aérien, permet de créer une structure extrêmement dense, sans points faibles, avec une résistance mécanique exceptionnelle.
              </p>
              <p className="text-graphite mb-4">
                Le résultat est un cadre plus rigide, plus réactif et nettement plus durable, capable d’absorber les chocs tout en restituant un maximum d’énergie à chaque frappe.
              </p>
              <p className="text-graphite mt-4 ">
                C’est également ce cadre, pensé dès l’origine comme une plateforme technique, qui rend possible le remplacement du tamis : un concept breveté, unique au monde dans l’univers du padel.
              </p>
            </div>
          </div>

          {/* Vidéo (1/4) */}
          <div className="md:col-span-1 w-full flex items-stretch">
            <video
              src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//video-cadre.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </div>
      </section>


{/* Procédé de carbone forgé */}
<section>
  <div className="bg-black py-12">
    <h2 className="text-center text-2xl font-bold text-white mb-10">Procédé de fabrication de notre cadre</h2>
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      {/* Upcyclage des fibres de carbone */}
      <motion.div 
        className="overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        viewport={{ once: true }}
      >
        <img 
          src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//chute-carbone.webp" 
          alt="Carbone recyclé" 
          className="w-full h-56 object-cover"
        />
        <div className="p-6 text-gray-400 leading-tight">Recyclage des chutes de fibres de carbone de l&apos;industrie aéronautique</div>
      </motion.div>

      {/* Tamis interchangeable */}
      <motion.div 
        className="overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: true }}
      >
        <img 
          src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Forged%20Carbon/chopped-carbon.webp" 
          alt="Torons" 
          className="w-full h-56 object-cover"
        />
<div className="p-6 text-gray-400 leading-tight">Déchiquettage des fibres de carbone 12K en fin torons</div>
      </motion.div>

      {/* Résines biosourcées */}
      <motion.div 
        className="overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        viewport={{ once: true }}
      >
        <img 
          src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Forged%20Carbon/autoclave.webp" 
          alt="Autoclave" 
          className="w-full h-56 object-cover"
        />
<div className="p-6 text-gray-400 leading-tight">Compression des fibres imprégnées de résine epoxy bio, à haute température et haute pression</div>
      </motion.div>

      {/* Compression à chaud */}
      <motion.div 
        className="overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
        viewport={{ once: true }}
      >
        <img 
          src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site/Forged%20Carbon/forged-carbon-sample.webp" 
          alt="Sample" 
          className="w-full h-56 object-cover"
        />
<div className="p-6 text-gray-400 leading-tight">Débavurage, ponçage et polissage du cadre</div>
      </motion.div>
    </div>
  </div>
</section>

{/* Tamis Remplaçables */}
<section className="py-16 px-6 md:px-20">
  <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-left">
  Système breveté de tamis remplaçable
  </h1>

  <div className="mx-auto grid md:grid-cols-2 gap-12 items-start">
    {/* Texte*/}
    <div className="flex flex-col text-left">
      <div className="flex-1">
        <p className="text-graphite mb-2 text">
        Nous avons pensé l’ensemble de notre production autour d’un principe de modularisation. Chaque cadre est identique et fabriqué en amont, et la raquette est assemblée avec un tamis ultra-personnalisé.
        </p>
        <p className="text-graphite mb-2 ">
        Ce système de différenciation retardée, inspiré des meilleures pratiques industrielles, nous permet de réduire les stocks, de gagner en flexibilité et de produire à la demande, nous permettant d&apos;offrir une qualilté premium à un prix juste.
        </p>
        <p className="text-graphite mt-4 ">
        Mais surtout, en cas d’usure ou de casse, seul le tamis est à remplacer – facilement, sans changer toute la raquette.
        </p>
        <p className="text-graphite mt-4 ">
         Double résultat : un coût total réduit pour nos joueurs et un impact minimisé sur l’environnement.
        </p>
      </div>
    </div>

    {/* Image*/}
    <div className="w-full flex items-stretch">
      <img
        src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//tamis-replace.webp"
        alt="Atelier de fabrication au Pakistan"
        className="w-full object-cover rounded-sm"
      />
    </div>
  </div>
</section>


    </div>
  )
}