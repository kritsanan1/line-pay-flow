# System Architecture Diagram (Textual Representation)

    This project implements a LINE Payment Processor using a React frontend, Supabase for backend services (database and edge functions), and Omise for payment processing.

    ## Core Application Components and Relationships

    ```mermaid
    graph TD
        subgraph Frontend (React Application)
            A[src/App.tsx] --> B(src/nav-items.tsx)
            B --> C1(src/pages/Index.tsx)
            B --> C2(src/pages/LineProcessor.tsx)
            C2 -- Fetches/Displays --> D(Supabase Client)
            C2 -- Real-time updates --> D
            C2 -- Tests --> E(LINE Webhook)
        end

        subgraph Backend (Supabase)
            D[Supabase Client] -- Interacts with --> F(Supabase Database)
            F -- Triggers --> G(Supabase Edge Functions)
            G -- Calls --> H(Omise API)
            G -- Calls --> I(LINE Messaging API)
        end

        subgraph External Services
            E[LINE Webhook] -- Receives events from --> J(LINE Platform)
            H[Omise API] -- Processes payments --> K(Omise Payment Gateway)
            I[LINE Messaging API] -- Sends messages to --> J
        end

        subgraph Data Flow
            J -- User Input (LINE messages) --> E
            E -- Processes/Creates --> F
            F -- Order Status Updates --> G
            G -- Payment Request --> H
            H -- Payment Confirmation --> G
            G -- Notification --> I
            K -- Payment Processing --> H
            F -- Data Query --> C2
        end

        subgraph Database Structure
            F -- Tables --> F1(services)
            F -- Tables --> F2(orders)
        end

        subgraph Authentication Flow
            Auth[User Authentication] -- Handled by --> D
        end

        subgraph Third-Party Integrations
            TP1[LINE Platform]
            TP2[Omise Payment Gateway]
        end

        style A fill:#f9f,stroke:#333,stroke-width:2px
        style C1 fill:#f9f,stroke:#333,stroke-width:2px
        style C2 fill:#f9f,stroke:#333,stroke-width:2px
        style D fill:#ccf,stroke:#333,stroke-width:2px
        style F fill:#ccf,stroke:#333,stroke-width:2px
        style G fill:#ccf,stroke:#333,stroke-width:2px
        style E fill:#cfc,stroke:#333,stroke-width:2px
        style H fill:#cfc,stroke:#333,stroke-width:2px
        style I fill:#cfc,stroke:#333,stroke-width:2px
        style J fill:#ccc,stroke:#333,stroke-width:2px
        style K fill:#ccc,stroke:#333,stroke-width:2px
        style F1 fill:#ccf,stroke:#333,stroke-width:2px
        style F2 fill:#ccf,stroke:#333,stroke-width:2px
        style Auth fill:#ccf,stroke:#333,stroke-width:2px
        style TP1 fill:#ccc,stroke:#333,stroke-width:2px
        style TP2 fill:#ccc,stroke:#333,stroke-width:2px
    ```

    ## Component Explanations:

    *   **Frontend (React Application)**: The user interface built with React and Shadcn UI components. It displays services, recent orders, and provides a testing interface.
        *   `src/App.tsx`: The root component, setting up routing and global providers.
        *   `src/pages/LineProcessor.tsx`: The main page, responsible for fetching and displaying data from Supabase, and interacting with the test webhook.
        *   `src/integrations/supabase/client.ts`: Initializes the Supabase client for frontend-backend communication.

    *   **Backend (Supabase)**: A serverless platform providing database, authentication, and edge functions.
        *   **Supabase Database**: Stores `services` (available products) and `orders` (transaction details).
        *   **Supabase Edge Functions**: Serverless functions deployed on Supabase.
            *   `supabase/functions/line-webhook/index.ts` (not shown in files, but implied by `LineProcessor.tsx`): Handles incoming messages from the LINE Platform, parses commands, creates orders in the database, and generates Omise payment URLs.
            *   `supabase/functions/omise-webhook/index.ts`: Receives payment status updates from Omise, updates order statuses in the Supabase database, and sends LINE notifications.

    *   **External Services**:
        *   **LINE Platform**: Users interact with the application through LINE messages. The platform sends webhook events to Supabase functions and receives messages back.
        *   **Omise Payment Gateway**: A payment service used to process PromptPay QR code payments. It receives payment requests from Supabase functions and sends webhook notifications back.

    ## Data Flow:

    1.  **User Interaction**: A user sends a message (e.g., "สั่งซื้อ บริการA 2") to the LINE OA.
    2.  **LINE Webhook**: The LINE Platform sends a webhook event to the `line-webhook` Supabase Edge Function.
    3.  **Order Creation**: The `line-webhook` function parses the message, fetches service details from the Supabase database, creates a new `pending` order entry, and generates an Omise PromptPay payment URL.
    4.  **Payment Link to User**: The `line-webhook` function sends a reply message to the user via the LINE Messaging API, including the payment URL.
    5.  **Payment Processing**: The user scans the PromptPay QR code (from the payment URL) and completes the payment via Omise.
    6.  **Omise Webhook**: Omise sends a webhook notification (e.g., `charge.successful`) to the `omise-webhook` Supabase Edge Function.
    7.  **Order Status Update**: The `omise-webhook` function updates the order status in the Supabase database to `paid` or `failed`.
    8.  **Real-time Updates**: The React frontend (specifically `LineProcessor.tsx`) listens for real-time changes on the `orders` table via Supabase subscriptions and updates the UI accordingly.
    9.  **LINE Notification**: The `omise-webhook` function sends a final confirmation message to the user via the LINE Messaging API.

    ## Authentication Flow:

    The current setup primarily relies on LINE user IDs for order tracking. Supabase client is initialized with `localStorage` for session persistence, implying potential future user authentication (e.g., for admin roles or user profiles) but not explicitly implemented for the core payment flow.

    ## Third-Party Service Integrations:

    *   **Supabase**: Database, Realtime, and Edge Functions.
    *   **Omise**: Payment gateway for PromptPay.
    *   **LINE**: Messaging platform for user interaction and notifications.