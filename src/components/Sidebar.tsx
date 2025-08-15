import type React from 'react'
import { Link } from 'react-router-dom'
import {  Home, MessageSquare, Settings } from "lucide-react"
export default function Sidebar() {
  return (
  <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4 flex-shrink-0">
        <Link to="/" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Home className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="p-2 rounded-lg bg-blue-100">
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
  )
}