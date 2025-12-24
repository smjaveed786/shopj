# Supabase Edge Functions Setup Guide

## Environment Variables Configuration

To set up the Supabase Edge Functions for this project, you need to configure environment variables in your Supabase Dashboard.

### Step 1: Access Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `qrtwvjeargiqisofrhkt`
3. Navigate to: **Project Settings** → **Edge Functions** → **Secrets**

### Step 2: Configure Environment Variables

Add the following environment variables:

#### Required for Emotion Analysis:

- **Key**: `GEMINI_API_KEY`
- **Value**: `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`
- **Description**: Google Gemini API key for emotion analysis

#### Required for Email Alerts (Choose ONE option):

**Option 1: Resend (Recommended)**

- **Key**: `RESEND_API_KEY`
- **Value**: Your Resend API key (get it from https://resend.com)
- **Description**: Resend API key for sending emails

- **Key**: `SMTP_FROM`
- **Value**: Your verified sender email (e.g., `onboarding@resend.dev` or your verified domain)
- **Description**: Email address to send from

**Option 2: SendGrid**

- **Key**: `SENDGRID_API_KEY`
- **Value**: Your SendGrid API key (get it from https://sendgrid.com)
- **Description**: SendGrid API key for sending emails

- **Key**: `SMTP_FROM`
- **Value**: Your verified sender email
- **Description**: Email address to send from

### Step 3: Deploy Edge Functions

After setting up the environment variables, deploy the edge functions:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref qrtwvjeargiqisofrhkt

# Deploy the functions
supabase functions deploy analyze-emotion
supabase functions deploy send-emergency-email
```

### Step 4: Verify Configuration

You can test the functions by:

1. **Testing analyze-emotion**: Use the emotion detection dashboard in your app
2. **Testing send-emergency-email**: The function will be automatically called when fear is detected

## Summary of Environment Variables

### Frontend (.env file)
- `VITE_SUPABASE_URL` - Already configured
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Already configured
- `VITE_GUARDIAN_EMAIL` - Already configured

### Supabase Edge Functions (Set in Dashboard)
- `GEMINI_API_KEY` - For emotion analysis ⚠️ **REQUIRED**
- `RESEND_API_KEY` + `SMTP_FROM` - For email alerts (Option 1) ⚠️ **REQUIRED for alerts**
- OR `SENDGRID_API_KEY` + `SMTP_FROM` - For email alerts (Option 2) ⚠️ **REQUIRED for alerts**

## Notes

- The Gemini API key is used by the `analyze-emotion` function
- The email service API key (Resend or SendGrid) is used by the `send-emergency-email` function
- Make sure to verify your sender email address in your chosen email service
- The functions will automatically be called when the app detects fear emotion with ≥90% confidence

