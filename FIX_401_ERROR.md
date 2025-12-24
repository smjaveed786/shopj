# Fix 401 Error - Step by Step

## The Problem
You're getting a **401 Unauthorized** error, which means:
- The function is being called ✅
- But Supabase is rejecting the request ❌

## Most Common Causes:

### 1. Function Not Deployed (Most Likely)
The function needs to be deployed to Supabase first.

### 2. Wrong Supabase Key
The publishable key might be incorrect.

### 3. Function Authentication Settings
The function might require authentication.

---

## Solution: Deploy the Function

### Option A: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```
   This will open a browser window for you to login.

3. **Navigate to your project**:
   ```bash
   cd "C:\Users\smjav\Downloads\infosys springboard\pr\shopj"
   ```

4. **Link to your Supabase project**:
   ```bash
   supabase link --project-ref qrtwvjeargiqisofrhkt
   ```
   You may need to enter your database password if prompted.

5. **Deploy the function**:
   ```bash
   supabase functions deploy analyze-emotion
   ```

6. **Set the Gemini API key**:
   ```bash
   supabase secrets set GEMINI_API_KEY=AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc
   ```

### Option B: Using Supabase Dashboard

1. **Go to**: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/functions

2. **Check if `analyze-emotion` exists**
   - If it exists, skip to step 5
   - If it doesn't exist, continue

3. **Create the function** (if needed):
   - Click "Create a new function"
   - Name it: `analyze-emotion`
   - Copy the code from: `shopj/supabase/functions/analyze-emotion/index.ts`

4. **Set Environment Variables**:
   - Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
   - Scroll to "Secrets"
   - Add: `GEMINI_API_KEY` = `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`

---

## Verify Your Supabase Keys

Make sure your `.env` file has the correct values:

```
VITE_SUPABASE_URL=https://qrtwvjeargiqisofrhkt.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_p8IjiDwFxbgQSSkkPL1-7A_yNMI2cj3
```

**Important**: After checking/changing `.env`, restart your dev server!

---

## After Deploying

1. **Wait 30-60 seconds** for the function to be ready
2. **Refresh your browser** (or restart the dev server)
3. **Test again** - the 401 error should be gone
4. **Check the console** - you should see successful function calls

---

## If You Still Get 401 After Deploying

1. **Verify the function exists**:
   - Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/functions
   - You should see `analyze-emotion` in the list

2. **Check function logs**:
   - Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/logs/edge-functions
   - Look for errors related to `analyze-emotion`

3. **Verify the Supabase key**:
   - Double-check that `VITE_SUPABASE_PUBLISHABLE_KEY` matches your project's anon key
   - You can find it in: Project Settings → API → anon/public key

4. **Check function permissions**:
   - Make sure the function doesn't require authentication
   - Edge Functions should be accessible with the anon key by default

---

## Quick Command Summary

```bash
# Install CLI (if needed)
npm install -g supabase

# Login
supabase login

# Link project
cd "C:\Users\smjav\Downloads\infosys springboard\pr\shopj"
supabase link --project-ref qrtwvjeargiqisofrhkt

# Deploy function
supabase functions deploy analyze-emotion

# Set API key
supabase secrets set GEMINI_API_KEY=AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc
```

After running these commands, restart your dev server and try again!

