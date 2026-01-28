-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  html TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  provider_message_id TEXT,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only read their own emails
CREATE POLICY "Users can read own emails" ON email_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own emails
CREATE POLICY "Users can insert own emails" ON email_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- No update/delete from client (server-only)

-- Create indexes for performance
CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX idx_email_logs_created_at ON email_logs(created_at);
CREATE INDEX idx_email_logs_status ON email_logs(status);