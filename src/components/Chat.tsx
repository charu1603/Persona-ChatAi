import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePersona } from '../context/PersonaContext'
import { db } from '../firebase/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import type { Message } from '../types'

const LINK_REGEX = /(https?:\/\/[^\s]+)/gi

export default function Chat() {
  const { persona } = usePersona()
  const location = useLocation()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)
const hasSentInitialRef = useRef(false);

const [initialLoading, setInitialLoading] = useState(false);

useEffect(() => {
  const initialText = (location.state as { initialText?: string } | null)?.initialText;
  if (initialText && !hasSentInitialRef.current) {
    setInitialLoading(true);       // start loader
    sendMessage(initialText, true);
    hasSentInitialRef.current = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
  }
}, [location.state]);


  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])




  const systemMsg = useMemo(() => ({ role: 'system' as const, content: persona.prompt }), [persona])

  const saveLink = async (url: string) => {
    await addDoc(collection(db, 'savedLinks'), {
      url,
      personaId: persona.id,
      createdAt: serverTimestamp()
    })
  }

  const saveStarred = async (msg: Message) => {
    await addDoc(collection(db, 'starredMessages'), {
      content: msg.content,
      role: msg.role,
      personaId: persona.id,
      createdAt: serverTimestamp()
    })
  }

  const detectAndStoreLinks = async (text: string) => {
    const found = text.match(LINK_REGEX)
    if (found) {
      for (const link of found) await saveLink(link)
    }
  }
const sendMessage = async (manualText?: string, fromHome?: boolean) => {
  const text = (fromHome ? manualText : input)?.trim();
  if (!text) return;

  if (!fromHome) setLoading(true);
  if (fromHome) setInitialLoading(true); // show loader for initial chat

  // Messages array for API
  const msgsForApi = fromHome
    ? [systemMsg, { role: "user", content: text }]
    : [systemMsg, ...[...messages, { role: "user", content: text }].map(m => ({ role: m.role, content: m.content }))];

  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`
      },
      body: JSON.stringify({ model: "gemini-2.0-flash", messages: msgsForApi })
    });

    const data = await res.json();
    const aiText = data.choices?.[0]?.message?.content ?? "…";

    // For initial message, add **user + AI together**
    if (fromHome) {
      const userMsg: Message = { role: "user", content: text, starred: false };
      const aiMsg: Message = { role: "assistant", content: aiText, starred: false };
      setMessages([userMsg, aiMsg]);
      await detectAndStoreLinks(text);
      await detectAndStoreLinks(aiText);
      setInitialLoading(false); // remove loader
    } else {
      const aiMsg: Message = { role: "assistant", content: aiText, starred: false };
      setMessages(prev => [...prev, aiMsg]);
      await detectAndStoreLinks(aiText);
    }

  } catch (e) {
    console.error(e);
    if (fromHome) setInitialLoading(false);
    setMessages(prev => [...prev, { role: "assistant", content: "Error contacting Gemini API. Check API key.", starred: false }]);
  } finally {
    if (!fromHome) setInput("");
    if (!fromHome) setLoading(false);
  }
};


  const toggleStar = async (index: number) => {
    setMessages(prev => {
      const next = [...prev]
      next[index] = { ...next[index], starred: !next[index].starred }
      if (next[index].starred) {
        void saveStarred(next[index])
      }
      return next
    })
  }

  return (
   <div className="flex flex-col items-center h-[90vh] overflow-y-auto hide-scrollbar max-w-6xl mx-auto px-6">
  {/* Messages */}
  <div className="flex flex-col gap-2 pt-2 mb-24 w-full">
 {messages.length === 0 && !initialLoading && (
  <div className="empty text-gray-500 text-center">
    Say something to {persona.name} 👋
  </div>
)}


    {messages.map((m, i) => (
      <div
        key={i}
        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            m.role === "user"
              ? "bg-green-200 rounded-br-none"
              : "bg-white border border-gray-200 rounded-bl-none"
          }`}
        >
          <div className="flex items-center justify-between text-xs text-black mb-1">
            <span>{m.role === "user" ? "You" : persona.name}</span>
            <button
              className={`ml-2 ${m.starred ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => toggleStar(i)}
            >
              {m.starred ? "★" : "☆"}
            </button>
          </div>
          <div className="text-sm whitespace-pre-wrap text-black">{m.content}</div>
        </div>
      </div>
    ))}
{initialLoading && (
  <div className="flex justify-center items-center">
    <div className="w-full rounded-lg p-3 bg-gray-100 border border-gray-200 rounded-bl-none animate-pulse">
      <span className="text-sm text-gray-500">Loading...</span>
    </div>
  </div>
)}

    <div ref={bottomRef} />
  </div>

  <div className="w-full flex gap-3 p-2 border-t border-gray-200 backdrop-blur-sm fixed bottom-0 max-w-6xl">
    <input
      className="flex-1 px-4 py-3 bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
      placeholder={`Message ${persona.name}…`}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter' && !loading) void sendMessage() }}
    />
    <button className="btn" onClick={() => void sendMessage()} disabled={loading}>
      {loading ? 'Sending…' : 'Send'}
    </button>
  </div>
</div>

  )
}
