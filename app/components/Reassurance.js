import React, { useEffect, useState } from 'react'

const ReassuranceItem = ({ icon, title, description }) => (
  <div className="flex h-full min-w-0 flex-col items-center p-4 text-center overflow-hidden">
    <div className="bg-black rounded-full p-3 mb-3">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 max-w-full break-words hyphens-auto">{title}</h3>
    <p className="text-gray-600 text-center text-sm max-w-full break-words hyphens-auto">{description}</p>
  </div>
)

const Reassurance = () => {
  const [isMobile, setIsMobile] = useState(false)

  const reassuranceItems = [
    {
      icon: <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15h14l1-2H4l-1 2z"/><path d="M4 3h11l4 4v13a1 1 0 0 1-1 1h-1"/><path d="M4 18v1a1 1 0 0 0 1 1h7"/></svg>,
      title: "Livraison gratuite",
      description: "Recevez votre raquette sans frais supplémentaires, partout en France."
    },
    {
      icon: <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/><path d="m8 12h8"/></svg>,
      title: "Retour sous 7 jours",
      description: "Essayez en toute sérénité. Vous avez 7 jours pour changer d'avis."
    },
    {
      icon: <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
      title: "Paiement sécurisé",
      description: "Transactions cryptées et 100% sécurisées."
    },
    {
      icon: <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V6L12 2 4 6v6c0 6 8 10 8 10"/><path d="m12 8 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2"/></svg>,
      title: "Cadre garanti 2 ans",
      description: "Notre cadre est garanti 2 ans contre la casse."
    },
    {
      icon: <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M9 21H5a2 2 0 0 1-2-2v-4"/><path d="M19 3h-4a2 2 0 0 0-2 2v4"/><path d="M19 21h-4a2 2 0 0 1-2-2v-4"/></svg>,
      title: "Tamis remplaçable",
      description: "Changez le tamis, pas la raquette. Design innovant et durable."
    },
    {
      icon: <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>,
      title: "Service client d'exception",
      description: "Une équipe réactive, passionnée et à votre écoute."
    }
  ]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 📱 Mobile
  if (isMobile) {
    return (
      <div className="w-full px-3">
        <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-4">
          {reassuranceItems.map((item, index) => (
            <ReassuranceItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    )
  }

  // 🖥️ Desktop
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 items-stretch gap-6 text-center">
        {reassuranceItems.map((item, index) => (
          <ReassuranceItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Reassurance