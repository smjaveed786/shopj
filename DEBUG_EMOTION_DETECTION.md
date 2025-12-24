# Debugging Emotion Detection Issues

If emotions are not being detected, follow these steps to diagnose and fix the issue:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Look for any error messages
4. Check for messages starting with:
   - "Calling analyze-emotion function..."
   - "Function response:"
   - "Analysis error:"

## Step 2: Verify Environment Variables

Check that your `.env` file has the correct values:

```env
VITE_SUPABASE_URL=https://qrtwvjeargiqisofrhkt.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_p8IjiDwFxbgQSSkkPL1-7A_yNMI2cj3
VITE_GUARDIAN_EMAIL=smjaveedahamed786@gmail.com
```

**Important**: After changing `.env`, restart the dev server!

## Step 3: Check Supabase Edge Function Deployment

1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/functions
2. Verify that `analyze-emotion` function is deployed
3. If not deployed, deploy it:
   ```bash
   supabase functions deploy analyze-emotion
   ```

## Step 4: Verify Supabase Edge Function Secrets

1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
2. Check that `GEMINI_API_KEY` is set:
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`

## Step 5: Check Supabase Function Logs

1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/logs/edge-functions
2. Filter by function: `analyze-emotion`
3. Look for errors or warnings
4. Check the logs for:
   - "GEMINI_API_KEY is not configured"
   - Gemini API errors
   - Response parsing errors

## Step 6: Test the Function Directly

You can test the edge function directly using curl:

```bash
# First, get your Supabase anon key from .env
# Then test the function (you'll need a base64 image)

curl -X POST 'https://qrtwvjeargiqisofrhkt.supabase.co/functions/v1/analyze-emotion' \
  -H 'Authorization: Bearer YOUR_SUPABASE_PUBLISHABLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"imageBase64": "YOUR_BASE64_IMAGE_DATA"}'
```

## Common Issues and Solutions

### Issue: "GEMINI_API_KEY is not configured"
**Solution**: Set the `GEMINI_API_KEY` secret in Supabase Edge Functions settings

### Issue: "Function not found" or 404 error
**Solution**: Deploy the edge function:
```bash
supabase functions deploy analyze-emotion
```

### Issue: "Invalid API key" or 401 error
**Solution**: 
- Verify the Gemini API key is correct
- Check that it's set in Supabase Edge Functions secrets
- Redeploy the function after adding secrets

### Issue: "No response from analysis service"
**Solution**:
- Check Supabase function logs
- Verify the function is deployed
- Check network tab in browser DevTools for failed requests

### Issue: Emotions always show as "neutral" with 0% confidence
**Solution**:
- Check if the function is being called (check browser console)
- Verify Gemini API is responding (check Supabase logs)
- Check if image data is being captured (camera working)

### Issue: Camera not starting
**Solution**:
- Allow camera permissions in browser
- Check browser console for camera errors
- Try a different browser

## Step 7: Verify Camera and Image Capture

1. Check that the camera starts when you click "Start Camera"
2. Check browser console for "Calling analyze-emotion function..."
3. Verify that images are being captured (check network requests)

## Step 8: Check Network Requests

1. Open browser DevTools → Network tab
2. Filter by "analyze-emotion"
3. Click on the request to see:
   - Request payload (should have imageBase64)
   - Response status (should be 200)
   - Response body (should have emotion data)

## Quick Diagnostic Checklist

- [ ] `.env` file has correct values
- [ ] Dev server restarted after `.env` changes
- [ ] Camera permissions granted
- [ ] Edge function is deployed
- [ ] `GEMINI_API_KEY` is set in Supabase secrets
- [ ] Browser console shows function calls
- [ ] Supabase logs show function execution
- [ ] Network requests return 200 status

If all items are checked and it's still not working, check the Supabase function logs for specific error messages.

