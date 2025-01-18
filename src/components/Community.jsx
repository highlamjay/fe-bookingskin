'use client'

import { useState, useRef } from 'react'
import Header from './Header.jsx'
import { FaMicrophone, FaStop, FaUpload, FaPaperPlane } from 'react-icons/fa'

const mockChannels = [
  { id: 1, name: 'General' },
  { id: 2, name: 'Product Discussion' },
  { id: 3, name: 'Support' },
  { id: 4, name: 'Off-Topic' },
]

const mockMessages = [
  { id: 1, user: 'Alice', content: 'Hey everyone! How\'s it going?', timestamp: '2023-06-20T10:00:00Z' },
  { id: 2, user: 'Bob', content: 'Hi Alice! All good here. How about you?', timestamp: '2023-06-20T10:05:00Z' },
  { id: 3, user: 'Charlie', content: 'Hello! Has anyone tried the new product yet?', timestamp: '2023-06-20T10:10:00Z' },
]

export default function CommunityPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [activeChannel, setActiveChannel] = useState(mockChannels[0])
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef(null)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleMicrophoneClick = () => {
    setIsRecording(!isRecording)
    console.log(isRecording ? 'Stopping recording...' : 'Starting recording...')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
      const message = {
        id: messages.length + 1,
        user: 'You',
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, message])
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header/>
      <div className="mt-12 flex-grow flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-semibold mb-4">Channels</h2>
          <ul>
            {mockChannels.map((channel) => (
              <li key={channel.id}>
                <button
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full text-left p-2 rounded ${
                    activeChannel.id === channel.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                >
                  # {channel.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main chat area */}
        <div className="flex-grow flex flex-col bg-white">
          {/* Channel header */}
          <div className="bg-gray-100 p-4 border-b">
            <h2 className="text-xl font-semibold">#{activeChannel.name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-baseline">
                  <span className="font-semibold mr-2">{message.user}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1">{message.content}</p>
              </div>
            ))}
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleMicrophoneClick}
                className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Upload file"
              >
                <FaUpload />
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}