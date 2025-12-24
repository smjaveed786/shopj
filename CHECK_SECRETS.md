# Check and Set Supabase Secrets

Since the functions are deployed, the 401 error is likely because the `GEMINI_API_KEY` secret is not set.

## Step 1: Check if Secrets are Set

1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
2. Scroll down to the **"Secrets"** or **"Environment Variables"** section
3. Look for `GEMINI_API_KEY`

## Step 2: Set the Secrets (if missing)

### Using Supabase Dashboard:

1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
2. Scroll to **"Secrets"** section
3. Click **"Add secret"** or **"New secret"**
4. Add these secrets:

   **Secret 1:**
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`
   - **Description**: Google Gemini API key for emotion analysis

5. Click **"Save"** or **"Add"**

### Using Supabase CLI:

```bash
cd "C:\Users\smjav\Downloads\infosys springboard\pr\shopj"
supabase secrets set GEMINI_API_KEY=AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc
```

## Step 3: Redeploy the Function (after setting secrets)

After setting the secret, you may need to redeploy the function for it to pick up the new environment variable:

```bash
supabase functions deploy analyze-emotion
```

Or wait a few minutes - sometimes it takes a moment for secrets to be available.

## Step 4: Test Again

1. Wait 1-2 minutes after setting the secret
2. Refresh your browser
3. Start the camera again
4. Check the console - the 401 error should be gone!

## Verify Secrets are Set

You can verify secrets are set using CLI:
```bash
supabase secrets list
```

This should show `GEMINI_API_KEY` in the list.

---

## Important Notes:

- Secrets are project-wide, so they apply to all functions
- After setting a secret, functions might need a few seconds to pick it up
- If the function still fails, check the function logs to see the exact error

