# Diagnostic Steps - Follow These in Order

## Step 1: Check Browser Console

1. **Open your app** in the browser (http://localhost:8080)
2. **Press F12** to open Developer Tools
3. **Click the "Console" tab**
4. **Start the camera** in your app
5. **Look for these messages:**

### ✅ Good Signs:
- "Calling analyze-emotion function..."
- "Function response: { data: {...}, fnError: null }"
- "Setting emotion data: { emotion: 'happy', confidence: 85, ... }"

### ❌ Error Signs:
- "Function error: ..."
- "GEMINI_API_KEY is not configured"
- "Function not found" or 404 errors
- "No data received from function"
- Network errors (red text)

**Write down any error messages you see!**

---

## Step 2: Check Supabase Functions

1. **Go to**: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/functions
2. **Look for**: `analyze-emotion` in the list

### ✅ If you see `analyze-emotion`:
- Function is deployed
- Go to Step 3

### ❌ If you DON'T see `analyze-emotion`:
- Function needs to be deployed
- See "Deploy Function" section below

---

## Step 3: Check Supabase Function Secrets

1. **Go to**: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
2. **Scroll to "Secrets" or "Environment Variables"**
3. **Check if `GEMINI_API_KEY` exists**

### ✅ If `GEMINI_API_KEY` exists:
- Check that the value is: `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`
- Go to Step 4

### ❌ If `GEMINI_API_KEY` does NOT exist:
- Click "Add Secret" or "Add Environment Variable"
- **Name**: `GEMINI_API_KEY`
- **Value**: `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`
- Click "Save"
- **Redeploy the function** (see Deploy Function section)

---

## Step 4: Check Supabase Function Logs

1. **Go to**: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/logs/edge-functions
2. **Filter by**: `analyze-emotion` (if filter option available)
3. **Look for recent logs** (last few minutes)
4. **Check for errors** (red text or error messages)

### Common Error Messages to Look For:

- ❌ `"GEMINI_API_KEY is not configured"` → Go back to Step 3
- ❌ `"Invalid API key"` → Check API key value in Step 3
- ❌ `"No response from Gemini API"` → Check API key validity
- ❌ `"Failed to parse response"` → This is a code issue, but should be fixed now
- ✅ `"Parsed analysis result: { emotion: 'happy', ... }"` → Function is working!

---

## Step 5: Check Network Requests (Advanced)

1. **In browser DevTools**, go to **"Network" tab**
2. **Filter by**: `analyze-emotion`
3. **Start the camera** in your app
4. **Look for requests** to `analyze-emotion`
5. **Click on a request** to see:
   - **Status**: Should be 200 (green)
   - **Response**: Should have emotion data
   - **Request**: Should have `imageBase64` in body

### ❌ If you see:
- **404 Not Found** → Function not deployed (Step 2)
- **401 Unauthorized** → Supabase key issue
- **500 Internal Server Error** → Check logs (Step 4)
- **No requests at all** → Function not being called (check console)

---

## Deploy Function (If Needed)

If the function doesn't exist in Step 2, deploy it:

### Option A: Using Supabase CLI

```bash
# 1. Install Supabase CLI (if not installed)
npm install -g supabase

# 2. Login to Supabase
supabase login

# 3. Link to your project
cd "C:\Users\smjav\Downloads\infosys springboard\pr\shopj"
supabase link --project-ref qrtwvjeargiqisofrhkt

# 4. Deploy the function
supabase functions deploy analyze-emotion
```

### Option B: Using Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/functions
2. Click "Create a new function" or "Deploy function"
3. Upload or paste the function code from: `supabase/functions/analyze-emotion/index.ts`

---

## Quick Fix Checklist

Run through this checklist:

- [ ] Browser console shows "Calling analyze-emotion function..."
- [ ] Function exists in Supabase Dashboard
- [ ] `GEMINI_API_KEY` secret is set in Supabase
- [ ] Function logs show successful execution (not errors)
- [ ] Network requests return 200 status
- [ ] Response contains emotion data (not just "neutral" with 0%)

---

## Report Back

After checking these steps, tell me:
1. **What errors you see in the browser console**
2. **Whether the function exists in Supabase**
3. **Whether `GEMINI_API_KEY` is set**
4. **What errors appear in Supabase logs**

This will help me identify the exact issue!

