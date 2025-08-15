import  { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { personas } from '../data/persona'

interface LinkDoc {
  id: string
  url: string
  personaId: string
  createdAt?: { seconds: number; nanoseconds: number }
}

export default function LinksPage() {
  const [items, setItems] = useState<LinkDoc[]>([])
  const [filterPersona, setFilterPersona] = useState<string>('all')

  const qRef = useMemo(() => {
    const base = collection(db, 'savedLinks')
    if (filterPersona === 'all') return query(base, orderBy('createdAt', 'desc'))
    return query(base, where('personaId', '==', filterPersona), orderBy('createdAt', 'desc'))
  }, [filterPersona])

  useEffect(() => {
    const unsub = onSnapshot(qRef, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<LinkDoc, 'id'>) }))
      setItems(docs)
    })
    return () => unsub()
  }, [qRef])

  return (
    <div className="page">
      <div className="page-header">
        <h2>Saved Links</h2>
        <div className="filters">
          <label>Persona:&nbsp;</label>
          <select value={filterPersona} onChange={e => setFilterPersona(e.target.value)}>
            <option value="all">All</option>
            {personas.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="list">
        {items.map(it => (
          <a key={it.id} className="card link" href={it.url} target="_blank" rel="noreferrer">
            <div className="content-text">{it.url}</div>
            <div className="meta"><span className="tag persona">{it.personaId}</span></div>
          </a>
        ))}
        {items.length === 0 && <div className="empty">No links saved yet.</div>}
      </div>
    </div>
  )
}
