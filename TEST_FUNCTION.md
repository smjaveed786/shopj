# Quick Test Guide

## Check if the function is working:

1. **Open Browser Console** (F12 → Console tab)
2. **Start the camera** in your app
3. **Look for these messages:**
   - "Calling analyze-emotion function..."
   - "Function response:"
   - Any error messages

## Common Issues:

### Issue: No console messages at all
**Problem**: Function not being called
**Solution**: Check if camera is working, check network tab for requests

### Issue: "GEMINI_API_KEY is not configured" error
**Problem**: API key not set in Supabase
**Solution**: 
1. Go to: https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/settings/functions
2. Add secret: `GEMINI_API_KEY` = `AIzaSyBS7bkFpErnpNLdMRSUTHrhepkY7MFqGQc`
3. Redeploy function

### Issue: "Function not found" or 404
**Problem**: Function not deployed
**Solution**: Deploy the function:
```bash
cd "C:\Users\smjav\Downloads\infosys springboard\pr\shopj"
supabase functions deploy analyze-emotion
```

### Issue: Function returns but emotion is always "neutral" with 0%
**Problem**: Either:
- API key invalid
- Gemini API error
- Response parsing failing

**Solution**: Check Supabase logs at:
https://supabase.com/dashboard/project/qrtwvjeargiqisofrhkt/logs/edge-functions

## Quick Diagnostic Steps:

1. ✅ Check browser console for errors
2. ✅ Check Supabase function logs
3. ✅ Verify function is deployed
4. ✅ Verify GEMINI_API_KEY is set
5. ✅ Check network tab for failed requests

