# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ce1ec83a-5211-4766-926a-2e84a5ab7448

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ce1ec83a-5211-4766-926a-2e84a5ab7448) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (for backend and edge functions)

## Fear Alert Feature

This application includes an emergency alert system that detects fear emotions and sends email notifications to guardians.

### How it works:

- When fear emotion is detected with **confidence ≥ 90%**, the system automatically sends an emergency email
- Email alerts are throttled to **once per 60 seconds** to prevent spam
- Emergency emails are sent with the subject: "🚨 EMERGENCY ALERT: Fear Detected"

### Environment Variables Setup

1. **Frontend (.env file):**
   - `VITE_GUARDIAN_EMAIL`: Email address of the guardian who will receive emergency alerts
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key

2. **Supabase Edge Function (set in Supabase Dashboard):**
   - Choose ONE email service option:
     
     **Option 1: Resend (Recommended)**
     - `RESEND_API_KEY`: Your Resend API key
     - `SMTP_FROM`: Sender email address (e.g., onboarding@resend.dev)
     
     **Option 2: SendGrid**
     - `SENDGRID_API_KEY`: Your SendGrid API key
     - `SMTP_FROM`: Sender email address
     
     **Option 3: Direct SMTP**
     - `SMTP_HOST`: SMTP server hostname
     - `SMTP_PORT`: SMTP server port (usually 587)
     - `SMTP_USER`: SMTP username
     - `SMTP_PASSWORD`: SMTP password
     - `SMTP_FROM`: Sender email address

   - `GEMINI_API_KEY`: Google Gemini API key for emotion analysis (used by analyze-emotion function)

### Setting up Supabase Edge Function Environment Variables:

1. Go to your Supabase Dashboard
2. Navigate to Project Settings > Edge Functions
3. Add the environment variables for the `send-emergency-email` function

### Getting Email Service API Keys:

- **Resend**: Sign up at [resend.com](https://resend.com) and get your API key
- **SendGrid**: Sign up at [sendgrid.com](https://sendgrid.com) and create an API key

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ce1ec83a-5211-4766-926a-2e84a5ab7448) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
