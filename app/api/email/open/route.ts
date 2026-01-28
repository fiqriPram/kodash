import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const openTrackingSchema = z.object({
  id: z.string().uuid("Invalid email ID"),
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return new NextResponse('Missing email ID', { status: 400 });
    }

    // Validate email ID
    const validatedData = openTrackingSchema.parse({ id: emailId });

    // Update opened_at timestamp if not already set
    if (supabase) {
      const { error } = await supabase
        .from('email_logs')
        .update({ 
          opened_at: new Date().toISOString() 
        })
        .eq('id', validatedData.id)
        .is('opened_at', null);

      if (error) {
        console.error('Database error:', error);
      }
    }

    // Return 1x1 transparent pixel
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'base64'
    );

    return new NextResponse(pixel, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid email ID', { status: 400 });
    }

    console.error('Open tracking error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}