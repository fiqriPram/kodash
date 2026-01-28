# MailBoard - Email Sending & Analytics Dashboard

A simple, reliable email sending dashboard built with Next.js and Supabase. Send transactional emails and track their performance with real-time analytics.

## Features

- **Email Sending**: Send transactional emails via Resend API
- **Email Analytics**: Track delivery status, open rates, and engagement
- **User Authentication**: Secure authentication via Supabase Auth
- **Email Logs**: View detailed logs of all sent emails
- **Open Tracking**: Track when emails are opened with pixel tracking
- **Row Level Security**: Users can only access their own email data
- **Rate Limiting**: Monthly email quotas per user
- **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase PostgreSQL with Row Level Security
- **Email Provider**: Resend
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Authentication**: Supabase Auth
- **Validation**: Zod

## Prerequisites

1. **Node.js** (v18+)
2. **Supabase** account and project
3. **Resend** account and API key
4. **Verified sender domain** in Resend

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd mailboard
npm install
```

### 2. Environment Variables

Copy the `.env` file and update with your credentials:

```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Database Setup

Run the SQL schema in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Execute the SQL to create the `email_logs` table and RLS policies

### 4. Supabase Authentication

Configure authentication providers in your Supabase project:

1. Go to **Authentication** → **Settings**
2. Enable **Email** authentication
3. Configure site URL and redirect URLs:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Sign Up**: Create a new account
2. **Login**: Sign in to your dashboard
3. **Send Emails**: Use the "Send Email" tab to send emails
4. **Track Performance**: View email logs and analytics in the "Email Logs" tab
5. **Monitor Opens**: Email opens are automatically tracked via pixel tracking

## Database Schema

### email_logs table

```sql
CREATE TABLE email_logs (
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
```

### Row Level Security Policies

- Users can only read their own email logs
- Users can only insert email logs for themselves
- No update/delete operations from client side

## API Endpoints

### Send Email
- **POST** `/api/send-email`
- Sends an email via Resend and logs it in the database

### Email Open Tracking
- **GET** `/api/email/open?id={email_id}`
- Tracks email opens and returns a 1x1 transparent pixel

## Email Quotas

- **Free Plan**: 50 emails per month
- **Pro Plan**: 2,000 emails per month
- **Business Plan**: Unlimited emails

Quotas are enforced server-side and reset monthly.

## Security Features

- **Row Level Security**: Users can only access their own data
- **Input Validation**: All inputs are validated using Zod schemas
- **Rate Limiting**: Monthly quotas prevent abuse
- **Secure Headers**: Proper authentication checks on all API routes
- **No Client Secrets**: API keys are only stored on the server

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables for Production

Make sure to add these in your production environment:

```env
RESEND_API_KEY=your_production_resend_key
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_supabase_service_role_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the Supabase and Resend documentation