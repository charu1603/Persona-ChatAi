import React, { createContext, useContext, useEffect, useState } from 'react'
import { personas } from '../data/persona'
import type { Persona } from '../types'

interface PersonaState {
  persona: Persona
  setPersona: (p: Persona) => void
}

const PersonaContext = createContext<PersonaState | undefined>(undefined)

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<Persona>(() => {
    const saved = localStorage.getItem('personaId')
    return personas.find(p => p.id === saved) || personas[0]
  })

  useEffect(() => {
    if (persona?.id) localStorage.setItem('personaId', persona.id)
  }, [persona])

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePersona() {
  const ctx = useContext(PersonaContext)
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider')
  return ctx
}
