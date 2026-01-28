"use client"

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Send, Mail, CheckCircle, XCircle, Eye, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface EmailLog {
  id: string
  to_email: string
  subject: string
  status: string
  created_at: string
  opened_at: string | null
}

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [emails, setEmails] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(true)
  const [sendLoading, setSendLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const loadEmails = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading emails:', error)
    } else {
      setEmails(data || [])
    }
  }, [supabase])

  useEffect(() => {
    if (user) {
      loadEmails(user.id)
    } else if (!authLoading) {
      router.push('/login')
    }
  }, [user, authLoading, loadEmails, router])

  useEffect(() => {
    if (!authLoading && user) {
      setLoading(false)
    }
  }, [authLoading, user])

  async function handleSendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSendLoading(true)

    const form = e.currentTarget
    const to = form.to.value
    const subject = form.subject.value
    const message = form.message.value

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ to, subject, message }),
      })

      if (response.ok) {
        form.reset()
        if (user) {
          await loadEmails(user.id)
        }
        alert('Email sent successfully!')
      } else {
        alert('Failed to send email')
      }
    } catch (error) {
      console.error('Send email error:', error)
      alert('Failed to send email')
    } finally {
      setSendLoading(false)
    }
  }

  const stats = {
    total: emails.length,
    sent: emails.filter(e => e.status === 'sent').length,
    failed: emails.filter(e => e.status === 'failed').length,
    opened: emails.filter(e => e.opened_at).length,
  }

  if (authLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">MailBoard Dashboard</h1>
              <p className="text-muted-foreground">Send emails and track their performance</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Opened</CardTitle>
                <Eye className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.opened}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="send" className="space-y-6">
            <TabsList>
              <TabsTrigger value="send">Send Email</TabsTrigger>
              <TabsTrigger value="logs">Email Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <Card>
                <CardHeader>
                  <CardTitle>Send New Email</CardTitle>
                  <CardDescription>
                    Send a transactional email to your recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendEmail} className="space-y-4">
                    <div>
                      <Input
                        name="to"
                        type="email"
                        placeholder="recipient@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="subject"
                        placeholder="Email subject"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Email message (HTML supported)"
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={sendLoading}>
                      <Send className="h-4 w-4 mr-2" />
                      {sendLoading ? 'Sending...' : 'Send Email'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>Email Logs</CardTitle>
                  <CardDescription>
                    View the status of your sent emails
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {emails.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No emails sent yet. Send your first email to see logs here.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {emails.map((email) => (
                        <div key={email.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium">{email.subject}</div>
                              <div className="text-sm text-muted-foreground">
                                To: {email.to_email}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {new Date(email.created_at).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={email.status === 'sent' ? 'default' : 'destructive'}
                              >
                                {email.status}
                              </Badge>
                              {email.opened_at && (
                                <Badge variant="secondary">Opened</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}