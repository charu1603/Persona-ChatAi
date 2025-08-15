import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen flex w-full">
      <Sidebar />
      <div className="main w-full h-full">
        <Navbar />
        <div className="h-full flex flex-col justify-center items-center  bg-gradient-to-br from-gray-50 to-gray-100">{children}</div>
      </div>
    </div>
  )
}