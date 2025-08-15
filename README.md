# Chat AI App

A modern chat application where users can send messages to a persona and get AI-generated responses in real-time. Built with **React**, **Google Gemini API** , **tailwind css** and **shadcnUI**

---

## Features

- **Real-time chat**: Messages sent and AI replies appear instantly.
- **Initial message support**: Users can start a conversation from a different page, with automatic handling of the first message.
- **Star messages**: Mark messages as favorites and store them in Firebase Firestore.
- **Detect and save links**: Any URLs in the messages are detected and saved to Firebase Firestore.
- **Smooth auto-scrolling**:
- **Clean UI**: Modern, responsive interface built with Tailwind CSS.
- **Custom persona**: Supports AI personas with prompts (Right now it has hitesh choudhary and piyush garg)

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend / API**: Google Gemini API
- **Database**: Firebase Firestore
- **Routing**: React Router
- **State Management**: React hooks, useState & useRef

---


## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/charu1603/Persona-ChatAi.git
cd chat-ai-app
```
### 2. Install dependencies
```bash
npm install
```
### 3.Configure firebase
```bash
Create a new project and Copy your Firebase config into src/firebase/firebaseConfig.ts.
```
### 4. Get google gemini key
```bash
VITE_GEMINI_API_KEY=your_api_key_here
```
### 5. Run the app
```bash
npm run dev
```


