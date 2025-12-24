# Deploy Functions to New Supabase Project

Since the functions are not listed in the new project, we need to deploy them.

## Method 1: Using npx (No Installation Required)

Run these commands in your terminal:

```bash
cd "C:\Users\smjav\Downloads\infosys springboard\pr\shopj"

# Login to Supabase
npx supabase login

# Link to your new project
npx supabase link --project-ref dpyybujscrbncinfwgpd

# Deploy the functions
npx supabase functions deploy analyze-emotion
npx supabase functions deploy send-emergency-email

# Set the Gemini API key secret
npx supabase secrets set GEMINI_API_KEY=AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc
```

## Method 2: Manual Deployment via Dashboard

If Method 1 doesn't work, you can manually create the functions:

### Deploy analyze-emotion:

1. Go to: https://supabase.com/dashboard/project/dpyybujscrbncinfwgpd/functions
2. Click "Deploy a new function" or "Create function"
3. Name it: `analyze-emotion`
4. Copy the code from: `shopj/supabase/functions/analyze-emotion/index.ts`
5. Paste it into the function editor
6. Deploy/Save

### Deploy send-emergency-email:

1. Same as above, but name it: `send-emergency-email`
2. Copy code from: `shopj/supabase/functions/send-emergency-email/index.ts`
3. Paste and deploy

### Set Secrets:

1. Go to: https://supabase.com/dashboard/project/dpyybujscrbncinfwgpd/settings/functions
2. Add secret: `GEMINI_API_KEY` = `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`

## After Deployment

1. Wait 1-2 minutes for functions to be ready
2. Restart your dev server
3. Test the emotion detection
4. The 401 error should be gone!

