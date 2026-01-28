# Authentication Troubleshooting

## Common Issues & Solutions

### 1. Cannot access signup page
**Problem**: Redirected to login when trying to access `/signup`
**Solution**: Fixed in middleware.ts - added `/signup` to exclusion list

### 2. "Invalid login credentials" error
**Common causes**:
- Email hasn't been confirmed yet
- Wrong password
- Account doesn't exist

**Solutions**:
- Check email for confirmation link
- Try signing up again
- Verify email is correct

### 3. Account created but can't login
**Problem**: Signup succeeds but login fails with "Invalid login credentials"
**Cause**: Email confirmation required

**Solutions**:
1. Check your email for confirmation message
2. Click the confirmation link
3. Try logging in again

### 4. No confirmation email received
**Problem**: Signed up but no confirmation email
**Solutions**:
1. Check spam folder
2. Verify email address is correct
3. Check Supabase email settings

### 5. Environment Variables Issues
**Required variables**:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

### 6. Supabase Auth Settings
Make sure in your Supabase project:
1. Go to Authentication → Settings
2. Enable "Enable email confirmations"
3. Set Site URL: `http://localhost:3000` (or your domain)
4. Set Redirect URLs: `http://localhost:3000/auth/callback`

### 7. Test Authentication Flow
Use the debug page at `/debug` to test authentication:
- Test signup with valid email
- Check console for errors
- Verify environment variables are loaded

### Quick Fixes to Try

1. **Clear browser cookies and localStorage**
2. **Restart development server**
3. **Check Supabase auth settings**
4. **Verify email provider configuration**

If issues persist, check the browser console for detailed error messages.