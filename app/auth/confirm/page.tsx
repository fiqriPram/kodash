"use client"

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

function ConfirmEmailContent() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    async function handleConfirmation() {
      const code = searchParams.get('code')
      
      if (code) {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            setMessage('Error confirming email: ' + error.message)
          } else {
            setMessage('Email confirmed successfully! Redirecting to dashboard...')
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          }
        } catch (error: unknown) {
          setMessage('Confirmation error: ' + (error instanceof Error ? error.message : 'Unknown error'))
        }
      } else {
        setMessage('No confirmation code found')
      }
      
      setLoading(false)
    }

    handleConfirmation()
  }, [searchParams, router, supabase])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Confirmation</CardTitle>
          <CardDescription>
            Processing your email confirmation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Confirming your email...</p>
            </div>
          ) : (
            <div className="text-center">
              <p className={message.includes('success') ? 'text-green-600' : 'text-red-600'}>
                {message}
              </p>
              {!message.includes('success') && (
                <div className="mt-4 space-y-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  )
}