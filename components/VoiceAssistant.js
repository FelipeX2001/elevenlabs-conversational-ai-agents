// components/VoiceAssistant.jsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, MessageCircle, Bot, User, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { downloadTranscript } from '@/utils/transcript'
import { Conversation } from '@11labs/client'
import { getSignedUrl } from '@/app/actions/getSignedUrl'
export default function VoiceAssistant() {
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('Desconectado')
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const startConversation = async () => {
    try {
      setConnectionStatus('connecting')
      // Get signed URL using server action
      const { signedUrl } = await getSignedUrl()
      console.log('signedUrl', signedUrl)
      if (!signedUrl) {
        throw new Error('Failed to get signed URL')
      }
      const conv = await Conversation.startSession({
        // agentId: process.env.NEXT_PUBLIC_AGENT_ID,
        signedUrl,
        onMessage: (message) => {
          console.log('message', message)
          setMessages((prev) => [
            ...prev,
            {
              source: message.source,
              message: message.message,
            },
          ])
        },
        onError: (error) => {
          console.error('Conversation error:', error)
          setConnectionStatus('Desconectado')
        },
        onStatusChange: (status) => {
          console.log('Connection status:', status)
          setConnectionStatus(
            status.status === 'connected' ? 'Conectado' : 'Desconectado'
          )
        },
        onModeChange: (mode) => {
          console.log('mode', mode)
          setIsSpeaking(mode.mode === 'Hablando')
        },
      })
      setConversation(conv)
      setIsActive(true)
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Failed to start conversation:', error)
      setConnectionStatus('Desconectado')
    }
  }

  const endConversation = async () => {
    if (conversation) {
      await conversation.endSession()
      setConversation(null)
      setIsSpeaking(false)
      setIsActive(false)
      setConnectionStatus('Desconectado')
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background p-4'>
      <div className='w-full max-w-xs'>
        {/* Voice Assistant Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='relative w-48 h-48 mx-auto mb-8 pt-2'
        >
          {/* Status Badge */}
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6'>
            <Badge
              variant='outline'
              className={`
                ${
                  connectionStatus === 'connected'
                    ? 'bg-success/20 text-success border-success/50'
                    : connectionStatus === 'connecting'
                    ? 'bg-warning/20 text-warning border-warning/50'
                    : 'bg-error/20 text-error border-error/50'
                }
                font-medium capitalize
              `}
            >
              {connectionStatus}
            </Badge>
          </div>

          {/* Base Circle */}
<div className='relative w-full h-full'>
  <div
    className={`absolute inset-0 rounded-full transition-colors duration-300 ${
      isActive ? 'bg-[#050a26]' : 'bg-[#7CECFF]' 
    }`}
  />
  <div className='absolute inset-[10%] rounded-full bg-[#7CECFF]' />
  {/* Pulse Effects */}
  {isSpeaking && (
    <div className='absolute inset-[15%]'>
      <div className='absolute inset-0 rounded-full bg-[#ffffff] opacity-20 animate-pulse-fast' />
      <div className='absolute inset-0 rounded-full bg-[#ffffff] opacity-15 animate-pulse-medium' />
      <div className='absolute inset-0 rounded-full bg-[#fffff] opacity-10 animate-pulse-slow' />
    </div>
  )}
</div>
</motion.div>

{/* Control Buttons */}
<div className='space-y-4'>
  {/* Microphone button */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={isActive ? endConversation : startConversation}
    className={`h-12 px-4 rounded-full flex items-center justify-center mx-auto ${
      isActive
        ? 'bg-[#7CECFF] text-[#FAF9F6]'
        : 'bg-[#FFFFFF] text-[#424242]'
    }`}
  >
    {isActive ? (
      <>
        <span className='mr-2'>Terminar</span>
        <MicOff className='w-6 h-6' />
      </>
    ) : (
      <>
        <Mic className='w-6 h-6' />
        <span className='ml-2'>Iniciar</span>
      </>
    )}
  </motion.button>

  {/* Show/Hide chat button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setShowChat(!showChat)}
    className='px-4 py-2 rounded-full bg-[#ffffff] text-[#424242] text-sm font-semibold flex items-center justify-center space-x-2 mx-auto'
  >
    <MessageCircle className='w-4 h-4' />
    <span>{showChat ? 'Ocultar Chat' : 'Ver Chat'}</span>
  </motion.button>
</div>

{/* Chat area */}
<AnimatePresence>
  {showChat && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='mt-4 bg-[#f5f5f5] rounded-xl overflow-hidden'
    >
      <div className='flex justify-end p-2'>
        <button
          onClick={() => downloadTranscript(messages)}
          className='text-[#050a26] hover:text-[#7CECFF] transition-colors'
        >
          <Download className='w-5 h-5' />
        </button>
      </div>
      <div
        ref={scrollAreaRef}
        className='h-64 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#000000] scrollbar-track-[#424242]'
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.source === 'user'
                ? 'flex-row-reverse'
                : 'flex-row'
            }`}
          >
            <div className='flex-shrink-0'>
              {message.source === 'user' ? (
                <User className='w-6 h-6 text-[#7CECFF]' />
              ) : (
                <Bot className='w-6 h-6 text-[#050a26]' />
              )}
            </div>
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.source === 'user'
                  ? 'bg-[#050a26] text-[#FAF9F6]'
                  : 'bg-[#ffffff] text-[#000000]'
              }`}
            >
              <p className='text-sm'>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </div>
  )
}
