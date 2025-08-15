import React from 'react'
import { usePersona } from '../context/PersonaContext'
import { personas } from '../data/persona'

export default function Navbar() {
  const { persona, setPersona } = usePersona()
  return (
    <header className="navbar text-black bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
   
      <div className="persona-switcher flex items-center gap-3">
        <label>Persona:&nbsp;</label>
        <select
          value={persona.id}
          onChange={e => setPersona(personas.find(p => p.id === e.target.value)!)}
        >
          {personas.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4"></div>
    </header>
  )
}
