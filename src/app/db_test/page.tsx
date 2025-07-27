'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DBTestPage() {
  const [connected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setConnected(true)
      } catch (err) {
        console.error('Connection failed:', err)
        setConnected(false)
      }
    }

    checkConnection()
  }, [])

  if (connected === null) return <p>Checking Supabase connection...</p>

  return (
    <div style={{ padding: '2rem' }}>
      {connected ? (
        <p style={{ color: 'green' }}>✅ Connected to Supabase</p>
      ) : (
        <p style={{ color: 'red' }}>❌ Failed to connect to Supabase</p>
      )}
    </div>
  )
}
