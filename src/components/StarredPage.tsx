import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { personas } from '../data/persona'

interface StarredDoc {
  id: string
  content: string
  role: 'user' | 'assistant'
  personaId: string
  createdAt?: { seconds: number; nanoseconds: number }
}

export default function StarredPage() {
  const [items, setItems] = useState<StarredDoc[]>([])
  const [filterPersona, setFilterPersona] = useState<string>('all')

  const qRef = useMemo(() => {
    const base = collection(db, 'starredMessages')
    if (filterPersona === 'all') return query(base, orderBy('createdAt', 'desc'))
    return query(base, where('personaId', '==', filterPersona), orderBy('createdAt', 'desc'))
  }, [filterPersona])

  useEffect(() => {
    const unsub = onSnapshot(qRef, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<StarredDoc, 'id'>) }))
      setItems(docs)
    })
    return () => unsub()
  }, [qRef])

  return (
    <div className="page">
      <div className="page-header">
        <h2>Starred Messages</h2>
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
          <div key={it.id} className="card">
            <div className="meta">
              <span className="tag">{it.role}</span>
              <span className="tag persona">{it.personaId}</span>
            </div>
            <div className="content-text">{it.content}</div>
          </div>
        ))}
        {items.length === 0 && <div className="empty">No starred messages yet.</div>}
      </div>
    </div>
  )
}
