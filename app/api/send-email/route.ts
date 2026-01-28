import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Validation schema
const sendEmailSchema = z.object({
  to: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: Request) {
  try {
    if (!resend || !supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const body = await req.json();
    
    // Validate request body
    const validatedData = sendEmailSchema.parse(body);
    const { to, subject, message } = validatedData;

    // Get user from session cookie
    const { data: { user }, error: authError } = await supabase.auth.getUser(req.headers.get('authorization')?.replace('Bearer ', '') || '');
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check user quota (simplified - you can implement more complex logic)
    const { data: emailCount } = await supabase!
      .from('email_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', new Date(new Date().setDate(1)).toISOString());

    const monthlyQuota = 50; // Free tier quota
    if (emailCount && emailCount.length >= monthlyQuota) {
      return NextResponse.json({ error: "Monthly quota exceeded" }, { status: 429 });
    }

    // Insert email record
    const { data: emailRecord, error: insertError } = await supabase!
      .from('email_logs')
      .insert({
        user_id: user.id,
        to_email: to,
        subject: subject,
        html: `<p>${message}</p>`,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return NextResponse.json({ error: "Failed to save email record" }, { status: 500 });
    }

    // Send email via Resend
    try {
      const data = await resend.emails.send({
        from: "MailBoard <no-reply@mailboard.app>",
        to,
        subject,
        html: `<p>${message}</p>`,
      });

      // Update email record with provider message ID and status
      await supabase!
        .from('email_logs')
        .update({
          status: 'sent',
          provider_message_id: (data as { id?: string }).id || 'unknown',
        })
        .eq('id', emailRecord.id);

      return NextResponse.json({ 
        success: true, 
        data,
        emailId: emailRecord.id
      });
    } catch (resendError) {
      console.error('Resend error:', resendError);
      
      // Update email record as failed
      await supabase!
        .from('email_logs')
        .update({
          status: 'failed',
        })
        .eq('id', emailRecord.id);

      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error('Server error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
