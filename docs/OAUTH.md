# Google OAuth Setup Guide

This document explains how to set up Google OAuth authentication for the evoke365 application.

## Prerequisites

- Google Cloud Platform account
- Access to Google Cloud Console
- Node.js application running locally or deployed

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" dropdown at the top
3. Click "New Project"
4. Enter project name (e.g., "evoke365-oauth")
5. Click "Create"

## Step 2: Enable Google+ API (Optional) and Configure OAuth

1. In the Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Google+ API" (if you need user profile information)
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required information:
   - **App name**: evoke365
   - **User support email**: Your email
   - **Developer contact information**: Your email
   - **App domain** (optional): Your domain if deployed
5. Click "Save and Continue"
6. On the "Scopes" page, click "Save and Continue" (default scopes are sufficient)
7. On the "Test users" page, add test users if needed, then "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Configure the following:
   - **Name**: evoke365-web-client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for development)
     - Your production domain (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs**: 
     - `http://localhost:3000` (for development)
     - Your production domain (e.g., `https://yourdomain.com`)
5. Click "Create"
6. Copy the "Client ID" from the popup (you'll need this for your app)

## Step 5: Configure Your Application

1. Create a `.env` file in your project root (if it doesn't exist):
   ```bash
   # In your project root directory
   touch .env
   ```

2. Add your Google Client ID to the `.env` file:
   ```env
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```
   Replace `your-google-client-id-here` with the actual Client ID from Step 4.

3. Make sure `.env` is in your `.gitignore` file to avoid committing sensitive information:
   ```gitignore
   # Environment variables
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:3000`
3. You should see the Google Sign-In button
4. Click the button and test the OAuth flow

## Backend Integration

The application sends the Google OAuth token to your backend API. Make sure your backend:

1. **Verifies the Google token** using Google's token verification endpoint
2. **Extracts user information** from the verified token
3. **Creates or updates user records** in your database
4. **Returns an application token** for subsequent API calls

### Example Backend Endpoint

Your backend should handle requests to the `/google-login` endpoint as defined in `src/store/authSlice.js`:

```javascript
// Expected request body:
{
  "googleToken": "eyJhbGciOiJSUzI1NiIs...",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "googleId": "1234567890"
}

// Expected response:
{
  "token": "your-app-jwt-token",
  "user": {
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/..."
  }
}
```

## Production Deployment

When deploying to production:

1. **Update OAuth credentials** in Google Cloud Console:
   - Add your production domain to "Authorized JavaScript origins"
   - Add your production domain to "Authorized redirect URIs"

2. **Set environment variable** in your production environment:
   ```bash
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```

3. **Verify domain ownership** (if required by Google)

## Security Considerations

1. **Never expose your Client Secret** in frontend code (our implementation uses Client ID only)
2. **Always verify tokens on the backend** before trusting user information
3. **Use HTTPS in production** for secure token transmission
4. **Implement proper CORS settings** on your backend API
5. **Set appropriate token expiration times**

## Troubleshooting

### Common Issues

**Error: "Invalid client ID"**
- Verify the Client ID in your `.env` file matches the one from Google Cloud Console
- Make sure you're using `REACT_APP_` prefix for the environment variable

**Error: "Unauthorized JavaScript origin"**
- Add your current domain to "Authorized JavaScript origins" in Google Cloud Console
- For localhost, use `http://localhost:3000` (not `https://`)

**Error: "Access blocked"**
- Complete the OAuth consent screen configuration
- Add test users if your app is in testing mode
- Verify your app domain is correctly configured

**Google Sign-In button not appearing**
- Check browser console for JavaScript errors
- Verify the Google Identity Services script is loading (`https://accounts.google.com/gsi/client`)
- Ensure your Client ID is correctly set

### Debug Steps

1. Check browser developer tools console for errors
2. Verify environment variables are loaded:
   ```javascript
   console.log('Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
   ```
3. Test the Google token verification manually using Google's tokeninfo endpoint
4. Check network tab for failed API requests

## Additional Resources

- [Google Identity Documentation](https://developers.google.com/identity)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)
- [OAuth 2.0 for Web Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter issues with the OAuth setup:

1. Check the troubleshooting section above
2. Review Google Cloud Console configuration
3. Verify backend API endpoints are working correctly
4. Check application logs for detailed error messages