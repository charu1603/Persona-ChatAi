import './App.css'
import {  Route, Routes, Navigate } from 'react-router-dom'
import Chat from './components/Chat';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import LinksPage from './components/SavedLinks';
import StarredPage from './components/StarredPage';
import { PersonaProvider } from './context/PersonaContext'
function App() {

  return (
 
 <PersonaProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/starred" element={<StarredPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </PersonaProvider>


  )
}

export default App
