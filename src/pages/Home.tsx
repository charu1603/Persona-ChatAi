import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePersona } from '../context/PersonaContext'
import { personas } from '../data/persona'

export default function HomePage() {
  const { persona, setPersona } = usePersona()
  const [quickText, setQuickText] = useState('')
  const navigate = useNavigate()

 const startChat = () => {
  const text = quickText.trim()
  if (!text) return
  navigate('/chat', { replace: true, state: { initialText: text } })
  setQuickText('') 
}


  return (
    <div className=" flex flex-col justify-center items-center">
   
      <div className="flex-1 flex flex-col justify-center items-center gap-8 px-4 py-22">
        <div className="text-center">
          <h1 className="text-gray-800 text-3xl font-bold mb-2">Choose Your Tech Mentor</h1>
          <p className="text-gray-600 text-lg">Select a persona to start learning</p>
        </div>

        <div className="gap-6 flex flex-wrap justify-center max-w-4xl">
          {personas.map((p) => (
            <button
              key={p.id}
              className={`group relative overflow-hidden rounded-2xl p-6 w-80   ${
                persona.id === p.id ? "ring-1 ring-blue-500" : " "
              } bg-white`}
              onClick={() => setPersona(p)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity`}
              ></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <img
                  src={p.avatar || "/placeholder.svg"}
                  alt={p.name}
                  className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow-lg"
                />

                <h3 className="text-xl font-bold text-gray-800 mb-2">{p.name}</h3>

                <p className="text-sm text-gray-600 italic mb-3">"{p.tagline}"</p>

              


             
              </div>

              {persona.id === p.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

    
      <div className="w-full flex gap-3 p-2 border-gray-200 backdrop-blur-sm">
        <input
          className="flex-1 px-4 py-3 bg-white/80 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
          placeholder={`Ask ${persona.name} anything about tech... (press Enter)`}
          value={quickText}
          onChange={(e) => setQuickText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") startChat()
          }}
        />
        <button
          className={`px-6 py-3 rounded-xl border-gray-300 bg-white/80 border font-medium text-black transition-all duration-200 bg-gradient-to-r hover:shadow-lg transform hover:scale-105`}
          onClick={startChat}
        >
          Start Chat
        </button>
      </div>
    </div>
  )
}