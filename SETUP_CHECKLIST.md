# Setup Checklist

Use this checklist to ensure everything is configured correctly.

## ✅ Frontend Configuration (`.env` file)

- [x] `VITE_SUPABASE_URL` - Set to `https://qrtwvjeargiqisofrhkt.supabase.co`
- [x] `VITE_SUPABASE_PUBLISHABLE_KEY` - Set to `sb_publishable_p8IjiDwFxbgQSSkkPL1-7A_yNMI2cj3`
- [x] `VITE_GUARDIAN_EMAIL` - Set to `smjaveedahamed786@gmail.com`

## ⚠️ Supabase Edge Functions Configuration (Dashboard)

### Required for Emotion Analysis:
- [ ] `GEMINI_API_KEY` = `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`

### Required for Email Alerts (Choose ONE):

**Option A: Resend (Recommended)**
- [ ] `RESEND_API_KEY` = (Your Resend API key - get from https://resend.com)
- [ ] `SMTP_FROM` = `onboarding@resend.dev` (or your verified domain email)

**Option B: SendGrid**
- [ ] `SENDGRID_API_KEY` = (Your SendGrid API key)
- [ ] `SMTP_FROM` = (Your verified sender email)

## 📋 Steps to Complete Setup

### 1. Set Up Resend Account (if using Resend)
- [ ] Sign up at https://resend.com
- [ ] Verify your email
- [ ] Create an API key
- [ ] Copy the API key

### 2. Configure Supabase Secrets
- [ ] Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
- [ ] Add `GEMINI_API_KEY` secret
- [ ] Add `RESEND_API_KEY` secret (or `SENDGRID_API_KEY`)
- [ ] Add `SMTP_FROM` secret

### 3. Deploy Edge Functions
- [ ] Install Supabase CLI: `npm install -g supabase`
- [ ] Login: `supabase login`
- [ ] Link project: `supabase link --project-ref qrtwvjeargiqisofrhkt`
- [ ] Deploy: `supabase functions deploy analyze-emotion`
- [ ] Deploy: `supabase functions deploy send-emergency-email`

### 4. Test the System
- [ ] Start dev server: `npm run dev`
- [ ] Open emotion detection dashboard
- [ ] Test fear detection (when ≥90% confidence)
- [ ] Verify email received at `smjaveedahamed786@gmail.com`

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt
- **Supabase Edge Functions Settings**: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
- **Resend Dashboard**: https://resend.com
- **SendGrid Dashboard**: https://sendgrid.com

## 📚 Documentation

- See `EMAIL_SETUP_GUIDE.md` for detailed Resend setup instructions
- See `SUPABASE_SETUP.md` for Supabase configuration details
- See `README.md` for general project information

## 🐛 Troubleshooting

If something isn't working:

1. **Check Supabase Function Logs**: Dashboard → Edge Functions → Logs
2. **Verify Environment Variables**: Make sure all secrets are set correctly
3. **Check Browser Console**: Look for any client-side errors
4. **Verify API Keys**: Ensure keys are valid and have correct permissions
5. **Check Email Service Dashboard**: Verify email delivery status

## ✨ Once Complete

When all items are checked:
- ✅ Emotion analysis will work using Gemini API
- ✅ Fear detection will trigger at ≥90% confidence
- ✅ Emergency emails will be sent to guardian (throttled to once per 60 seconds)
- ✅ System is ready for use!

