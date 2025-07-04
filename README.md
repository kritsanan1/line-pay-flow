# LINE Payment Processor

    This project implements a LINE Payment Processor that integrates with LINE Official Account (OA) for user interaction and Omise for PromptPay QR code payments. It uses Supabase as its backend for database management and serverless functions.

    ## Project Overview

    The application allows users to order services via LINE messages. Upon receiving an order, it generates a PromptPay QR code via Omise. Once the payment is completed, the system updates the order status in real-time and notifies the user via LINE.

    ## Features

    *   Process service orders via LINE messages.
    *   Generate Omise PromptPay QR codes for payment.
    *   Real-time order status updates on the dashboard.
    *   LINE notifications for payment success/failure.
    *   Dashboard to view available services and recent orders.

    ## Prerequisites

    Before you begin, ensure you have the following installed:

    *   Node.js (LTS version recommended)
    *   npm (Node Package Manager)

    You can install Node.js and npm using `nvm` (Node Version Manager) for easier management:
    ```bash
    # Install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

    # Install Node.js LTS
    nvm install --lts
    nvm use --lts
    ```

    ## Installation

    1.  **Clone the repository**:
        ```bash
        git clone <YOUR_GIT_URL>
        cd <YOUR_PROJECT_NAME>
        ```    2.  **Install dependencies**:
        ```bash
        npm install
        ```

    ## Environment Configuration

    This project requires environment variables for Supabase, LINE, and Omise.

    1.  **Supabase**:
        *   Create a Supabase project.
        *   Get your Supabase URL and Anon Key from Project Settings -> API.
        *   Get your Supabase Service Role Key from Project Settings -> API (this is used by Edge Functions).
        *   Set up your database schema using the provided migration files in `supabase/migrations/`.

    2.  **LINE Messaging API**:
        *   Create a LINE Official Account and a Messaging API channel.
        *   Obtain your Channel Access Token and Channel Secret.

    3.  **Omise**:
        *   Sign up for an Omise account.
        *   Obtain your Public Key and Secret Key.

    **Environment Variables**:
    You will need to set these environment variables in your Supabase Edge Functions (e.g., `line-webhook` and `omise-webhook`) and potentially in your local development environment.

    For Supabase Edge Functions, you can set these in the Supabase dashboard or via the Supabase CLI.

    *   `SUPABASE_URL`: Your Supabase project URL.
    *   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for Edge Functions).
    *   `LINE_ACCESS_TOKEN`: Your LINE Messaging API Channel Access Token.
    *   `LINE_CHANNEL_SECRET`: Your LINE Messaging API Channel Secret.
    *   `OMISE_PUBLIC_KEY`: Your Omise Public Key.
    *   `OMISE_SECRET_KEY`: Your Omise Secret Key.

    ## Local Development Setup

    To run the application locally:

    1.  **Start the development server**:
        ```bash
        npm run dev
        ```
    2.  The application will be available at `http://localhost:8080`.

    ## Testing Procedures

    The `LineProcessor` page includes a "Test Webhook" button that simulates a LINE message.

    **Manual Testing Flow**:
    1.  Ensure your Supabase Edge Functions (`line-webhook` and `omise-webhook`) are deployed and configured with the correct environment variables.
    2.  Configure your LINE Messaging API webhook URL to point to your deployed `line-webhook` function (e.g., `https://your-supabase-project-id.supabase.co/functions/v1/line-webhook`).
    3.  Configure your Omise webhook URL to point to your deployed `omise-webhook` function (e.g., `https://your-supabase-project-id.supabase.co/functions/v1/omise-webhook`).
    4.  Send a message like "สั่งซื้อ บริการA 2" to your LINE Official Account.
    5.  Observe the response in LINE (should include a payment link).
    6.  Complete the payment using the provided link.
    7.  Observe the payment confirmation in LINE and the real-time update on the `LineProcessor` dashboard.

    ## Deployment Process

    This project can be deployed using Lovable's built-in publishing feature or by deploying the static frontend to a hosting provider like Netlify and the Supabase functions to Supabase Edge Functions.

    **Using Lovable**:
    1.  Open your project in Lovable.
    2.  Click on `Share` -> `Publish`.

    **Manual Deployment (Frontend)**:
    1.  Build the project for production:
        ```bash
        npm run build
        ```
    2.  Deploy the contents of the `dist` folder to your preferred static site hosting provider (e.g., Netlify, Vercel, GitHub Pages).

    **Manual Deployment (Supabase Edge Functions)**:
    1.  Ensure you have the Supabase CLI installed and configured.
    2.  Deploy your functions:
        ```bash
        supabase functions deploy line-webhook --no-verify-jwt --project-ref <your-supabase-project-id>
        supabase functions deploy omise-webhook --no-verify-jwt --project-ref <your-supabase-project-id>
        ```
        (Replace `<your-supabase-project-id>` with your actual project ID).

    ## Contribution Guidelines

    Contributions are welcome! Please follow standard GitHub flow:
    1.  Fork the repository.
    2.  Create a new branch for your feature or bug fix.
    3.  Make your changes.
    4.  Commit your changes with a clear message.
    5.  Push to your fork.
    6.  Create a pull request.

    ## License Information

    This project is licensed under the MIT License.