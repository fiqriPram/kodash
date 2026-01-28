"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface EnvInfo {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

interface AuthStatus {
  user: unknown;
  error: unknown;
}

export default function DebugPage() {
  const [envInfo, setEnvInfo] = useState<EnvInfo>({
    supabaseUrl: 'Checking...',
    supabaseAnonKey: 'Checking...',
  })
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Check environment variables
    const envData: EnvInfo = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
    }
    
    // Check auth status
    supabase.auth.getUser().then(({ data, error }) => {
      setAuthStatus({
        user: data.user,
        error: error
      })
      setEnvInfo(envData)
    })
  }, [supabase.auth])

  async function testSignUp() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'password123'
      })
      
      console.log('Sign up result:', { data, error })
      alert('Sign up result: ' + JSON.stringify({ data, error }, null, 2))
    } catch (e: unknown) {
      console.error('Sign up error:', e)
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      alert('Sign up error: ' + errorMessage)
    }
  }

  async function testSignIn() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      })
      
      console.log('Sign in result:', { data, error })
      alert('Sign in result: ' + JSON.stringify({ data, error }, null, 2))
    } catch (e: unknown) {
      console.error('Sign in error:', e)
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      alert('Sign in error: ' + errorMessage)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
      
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Environment Variables:</h2>
        <pre className="text-sm">{JSON.stringify(envInfo, null, 2)}</pre>
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Auth Status:</h2>
        <pre className="text-sm">{JSON.stringify(authStatus, null, 2)}</pre>
      </div>

      <div className="space-x-4">
        <button 
          onClick={testSignUp}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test Sign Up
        </button>
        <button 
          onClick={testSignIn}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Test Sign In
        </button>
      </div>
    </div>
  )
}