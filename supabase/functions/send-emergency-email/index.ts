import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  subject: string;
  body: string;
}

// Send email via SMTP service API (works with Resend, SendGrid, Mailgun, etc.)
// For direct SMTP, configure your service to use their API endpoint
async function sendEmailViaSMTP(to: string, subject: string, body: string): Promise<{ success: boolean; error?: string }> {
  const SMTP_FROM = Deno.env.get('SMTP_FROM');
  
  // Option 1: Use Resend API (recommended - simple and reliable)
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: SMTP_FROM || 'onboarding@resend.dev',
          to: [to],
          subject: subject,
          text: body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Resend API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email via Resend',
      };
    }
  }

  // Option 2: Use SendGrid API
  const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
  if (SENDGRID_API_KEY) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: SMTP_FROM || 'noreply@example.com' },
          subject: subject,
          content: [{ type: 'text/plain', value: body }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SendGrid API error: ${response.status} - ${errorText}`);
      }

      return { success: true };
    } catch (error) {
      console.error('SendGrid API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email via SendGrid',
      };
    }
  }

  // Option 3: Direct SMTP (requires SMTP credentials)
  const SMTP_HOST = Deno.env.get('SMTP_HOST');
  const SMTP_PORT = Deno.env.get('SMTP_PORT') || '587';
  const SMTP_USER = Deno.env.get('SMTP_USER');
  const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD');

  if (SMTP_HOST && SMTP_USER && SMTP_PASSWORD) {
    // For direct SMTP, use a library or implement basic SMTP protocol
    // This is a simplified version - for production, consider using a service API
    try {
      // Note: Direct SMTP implementation in Deno Edge Functions is complex
      // Recommended: Use Resend, SendGrid, or another email service API
      return {
        success: false,
        error: 'Direct SMTP not fully implemented. Please use RESEND_API_KEY or SENDGRID_API_KEY for email sending.',
      };
    } catch (error) {
      console.error('SMTP error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SMTP error',
      };
    }
  }

  return {
    success: false,
    error: 'No email configuration found. Please set RESEND_API_KEY, SENDGRID_API_KEY, or SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM) in environment variables.',
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, body }: EmailRequest = await req.json();

    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await sendEmailViaSMTP(to, subject, body);

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error || 'Failed to send email' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('send-emergency-email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
