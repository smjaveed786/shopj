# Email Service Setup Guide - Resend

This guide will help you set up Resend for sending emergency email alerts when fear emotion is detected.

## Step 1: Create Resend Account

1. Go to https://resend.com
2. Click "Sign Up" or "Get Started"
3. Create an account using your email (you can use `smjaveedahamed786@gmail.com`)

## Step 2: Verify Your Email

1. Check your email inbox for a verification email from Resend
2. Click the verification link to verify your email address

## Step 3: Get Your API Key

1. After logging in, go to the **API Keys** section in the dashboard
2. Click **"Create API Key"**
3. Give it a name like "ShopJ Emergency Alerts"
4. Select the **"Sending access"** permission
5. Click **"Add"**
6. **Copy the API key immediately** - you won't be able to see it again!

## Step 4: Add Domain (Optional but Recommended)

For production use, you should add and verify your domain:

1. Go to **Domains** in the Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow the DNS verification steps to verify domain ownership
5. Once verified, you can use emails like `alerts@yourdomain.com`

**Note**: For testing, you can use the default `onboarding@resend.dev` sender address.

## Step 5: Configure Supabase Edge Functions

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
2. Scroll down to **"Secrets"** or **"Environment Variables"**
3. Add the following secrets:

   **Secret 1:**
   - **Name**: `RESEND_API_KEY`
   - **Value**: (paste your Resend API key from Step 3)
   - **Description**: Resend API key for sending emergency emails

   **Secret 2:**
   - **Name**: `SMTP_FROM`
   - **Value**: `onboarding@resend.dev` (for testing) or `alerts@yourdomain.com` (if you verified a domain)
   - **Description**: Sender email address for emergency alerts

4. Click **"Save"** or **"Add Secret"** for each one

## Step 6: Configure Gemini API Key (if not done already)

1. In the same Supabase Edge Functions settings page
2. Add another secret:

   **Secret:**
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`
   - **Description**: Google Gemini API key for emotion analysis

## Step 7: Deploy Edge Functions

If you haven't deployed the edge functions yet, you need to do so:

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref qrtwvjeargiqisofrhkt

# Deploy the functions
supabase functions deploy analyze-emotion
supabase functions deploy send-emergency-email
```

### Option B: Using Supabase Dashboard

1. Go to **Edge Functions** in your Supabase Dashboard
2. You can deploy functions directly from the dashboard if they're already in your repository

## Step 8: Test the Setup

1. Start your development server: `npm run dev`
2. Go to the Emotion Detection Dashboard
3. When fear emotion is detected with ≥90% confidence, check the guardian email inbox
4. You should receive an email with subject: "🚨 EMERGENCY ALERT: Fear Detected"

## Troubleshooting

### Email not sending?

1. **Check Supabase Function Logs**:
   - Go to Edge Functions → Logs in Supabase Dashboard
   - Look for any error messages

2. **Verify API Key**:
   - Make sure `RESEND_API_KEY` is set correctly in Supabase secrets
   - Check that the API key has "Sending access" permission

3. **Check Sender Email**:
   - For testing, use `onboarding@resend.dev`
   - If using a custom domain, make sure it's verified in Resend

4. **Check Rate Limits**:
   - Resend free tier allows 100 emails per day
   - Make sure you haven't exceeded the limit

### Function not working?

1. **Check Environment Variables**:
   - Verify all secrets are set in Supabase Dashboard
   - Make sure variable names match exactly (case-sensitive)

2. **Check Function Deployment**:
   - Ensure functions are deployed successfully
   - Check function logs for errors

3. **Check Network/CORS**:
   - Verify CORS headers are set correctly
   - Check browser console for CORS errors

## Resend Pricing

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **Paid Plans**: Start at $20/month for higher limits

For the emergency alert system, the free tier should be sufficient unless you expect many alerts.

## Next Steps

Once everything is set up:
1. Test the fear detection and email alert system
2. Monitor the Supabase function logs
3. Check Resend dashboard for email delivery status
4. Adjust the fear detection threshold if needed (currently ≥90% confidence)

