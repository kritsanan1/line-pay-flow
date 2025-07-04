# Project File Structure Explanation

    This document provides a detailed overview of the project's file structure, describing the purpose and importance of each file and its relationships with other components.

    ```
    .
    ├── components.json                 # Configuration for shadcn/ui components. 🟢
    ├── eslint.config.js                # ESLint configuration for code linting rules. 🟢
    ├── index.html                      # Main HTML entry point for the React application. 🟢
    ├── package.json                    # Project dependencies, scripts, and metadata. 🟢
    ├── postcss.config.js               # PostCSS configuration for Tailwind CSS processing. 🟢
    ├── public/                         # Static assets directory.
    │   └── robots.txt                  # Defines rules for web crawlers. 🔴
    ├── README.md                       # Project overview, setup, and usage instructions. 🟢
    ├── src/                            # Source code directory for the React application.
    │   ├── App.css                     # Global CSS styles for the React application. 🟡
    │   ├── App.tsx                     # Main React application component, sets up routing and global providers. 🟢
    │   │   └── Depends on: `nav-items.tsx`, `@tanstack/react-query`, `react-router-dom`, `components/ui/sonner`, `components/ui/tooltip`.
    │   ├── components/                 # Reusable UI components.
    │   │   └── ui/                     # shadcn/ui components.
    │   │       ├── accordion.tsx       # Accordion component for collapsible content. 🟢
    │   │       ├── alert-dialog.tsx    # Alert dialog component for modal confirmations. 🟢
    │   │       ├── alert.tsx           # Alert component for displaying messages. 🟢
    │   │       ├── aspect-ratio.tsx    # Aspect ratio component for maintaining proportions. 🟢
    │   │       ├── avatar.tsx          # Avatar component for user profiles. 🟢
    │   │       ├── badge.tsx           # Badge component for small status indicators. 🟢
    │   │       │   └── Used by: `LineProcessor.tsx`.
    │   │       ├── breadcrumb.tsx      # Breadcrumb component for navigation paths. 🟢
    │   │       ├── button.tsx          # Reusable button component. 🟢
    │   │       │   └── Used by: `LineProcessor.tsx`, `calendar.tsx`, `carousel.tsx`, `sidebar.tsx`.
    │   │       ├── calendar.tsx        # Calendar component for date selection. 🟢
    │   │       ├── card.tsx            # Card component for content grouping. 🟢
    │   │       │   └── Used by: `LineProcessor.tsx`.
    │   │       ├── carousel.tsx        # Carousel component for image/content sliders. 🟢
    │   │       ├── chart.tsx           # Chart component for data visualization. 🟢
    │   │       ├── checkbox.tsx        # Checkbox component for boolean input. 🟢
    │   │       ├── collapsible.tsx     # Collapsible component for expandable sections. 🟢
    │   │       ├── command.tsx         # Command palette component. 🟢
    │   │       ├── context-menu.tsx    # Context menu component for right-click actions. 🟢
    │   │       ├── dialog.tsx          # Dialog component for modal overlays. 🟢
    │   │       ├── drawer.tsx          # Drawer component for slide-in panels. 🟢
    │   │       ├── dropdown-menu.tsx   # Dropdown menu component. 🟢
    │   │       ├── form.tsx            # Form components integrated with React Hook Form. 🟢
    │   │       ├── hover-card.tsx      # Hover card component for rich tooltips. 🟢
    │   │       ├── input-otp.tsx       # OTP input component. 🟢
    │   │       ├── input.tsx           # Input field component. 🟢
    │   │       │   └── Used by: `sidebar.tsx`.
    │   │       ├── label.tsx           # Label component for form elements. 🟢
    │   │       ├── menubar.tsx         # Menubar component for desktop navigation. 🟢
    │   │       ├── navigation-menu.tsx # Navigation menu component. 🟢
    │   │       ├── pagination.tsx      # Pagination component for data navigation. 🟢
    │   │       ├── popover.tsx         # Popover component for transient UI. 🟢
    │   │       ├── progress.tsx        # Progress bar component. 🟢
    │   │       ├── radio-group.tsx     # Radio group component for single selection. 🟢
    │   │       ├── resizable.tsx       # Resizable panel component. 🟢
    │   │       ├── scroll-area.tsx     # Scroll area component for custom scrollbars. 🟢
    │   │       ├── select.tsx          # Select component for dropdowns. 🟢
    │   │       ├── separator.tsx       # Separator component for visual division. 🟢
    │   │       │   └── Used by: `sidebar.tsx`.
    │   │       ├── sheet.tsx           # Sheet component for slide-in content. 🟢
    │   │       │   └── Used by: `sidebar.tsx`.
    │   │       ├── sidebar.tsx         # Sidebar component for navigation. 🟢
    │   │       ├── skeleton.tsx        # Skeleton component for loading states. 🟢
    │   │       │   └── Used by: `sidebar.tsx`.
    │   │       ├── slider.tsx          # Slider component for range selection. 🟢
    │   │       ├── sonner.tsx          # Sonner toast notification component. 🟢
    │   │       │   └── Used by: `App.tsx`, `LineProcessor.tsx`.
    │   │       ├── switch.tsx          # Switch component for toggle input. 🟢
    │   │       ├── table.tsx           # Table component for data display. 🟢
    │   │       ├── tabs.tsx            # Tabs component for content organization. 🟢
    │   │       ├── textarea.tsx        # Textarea component for multi-line input. 🟢
    │   │       ├── toaster.tsx         # Toast display area component. 🟢
    │   │       ├── toast.tsx           # Individual toast component. 🟢
    │   │       ├── toggle-group.tsx    # Toggle group component for multiple toggles. 🟢
    │   │       ├── toggle.tsx          # Toggle component for on/off states. 🟢
    │   │       ├── tooltip.tsx         # Tooltip component for hover information. 🟢
    │   │       │   └── Used by: `App.tsx`, `sidebar.tsx`.
    │   │       └── use-toast.ts        # Re-export of the `useToast` hook. 🟢
    │   ├── hooks/                      # Custom React hooks.
    │   │   ├── use-mobile.tsx          # Hook to detect if the current device is mobile. 🟡
    │   │   │   └── Used by: `sidebar.tsx`.
    │   │   └── use-toast.ts            # Hook for managing and displaying toast notifications. 🟢
    │   │       └── Used by: `components/ui/toaster.tsx`, `components/ui/use-toast.ts`.
    │   ├── index.css                   # Main CSS file, includes Tailwind directives and custom CSS variables. 🟢
    │   ├── integrations/               # Integrations with external services.
    │   │   ├── supabase/               # Supabase integration files.
    │   │   │   ├── client.ts           # Supabase client initialization and configuration. 🟢
    │   │   │   │   └── Used by: `LineProcessor.tsx`.
    │   │   │   └── types.ts            # TypeScript types generated from the Supabase database schema. 🟢
    │   │   │       └── Used by: `client.ts`.
    │   ├── lib/                        # Utility functions and helpers.
    │   │   └── utils.ts                # General utility functions (e.g., `cn` for Tailwind class merging). 🟢
    │   │       └── Used by: most shadcn/ui components.
    │   ├── main.tsx                    # Entry point for the React application, renders the `App` component. 🟢
    │   ├── nav-items.tsx               # Defines navigation items and their corresponding page components. 🟢
    │   │   └── Used by: `App.tsx`.
    │   ├── pages/                      # React page components.
    │   │   ├── Index.tsx               # Home page component. 🟡
    │   │   │   └── Used by: `nav-items.tsx`.
    │   │   ├── LineProcessor.tsx       # Main application page for LINE payment processing, displays services and orders. 🟢
    │   │   │   └── Depends on: `components/ui/card`, `components/ui/badge`, `components/ui/button`, `lucide-react`, `integrations/supabase/client`, `@tanstack/react-query`, `sonner`.
    │   │   │   └── Used by: `nav-items.tsx`.
    │   │   └── NotFound.tsx            # 404 error page component. 🟡
    │   ├── vite-env.d.ts               # TypeScript declaration for Vite environment variables. 🔴
    ├── supabase/                       # Supabase project configuration and functions.
    │   ├── config.toml                 # Supabase project configuration file. 🟡
    │   ├── functions/                  # Supabase Edge Functions.
    │   │   └── omise-webhook/          # Omise webhook handler function.
    │   │       └── index.ts            # Supabase Edge Function to handle Omise payment webhooks. 🟢
    │   │           └── Interacts with: Supabase database (`orders` table), LINE Messaging API.
    │   └── migrations/                 # Supabase database migration scripts.
    │       ├── 20250704063042-66ce8861-2646-4196-a016-c3012f834c20.sql # SQL migration for `services` and `orders` tables, RLS policies. 🟢
    │       └── 20250704063405-ba8a380a-05ce-49ce-acc4-79a8e31a6a1e.sql # SQL migration (likely a duplicate or minor update) for `services` and `orders` tables, RLS policies. 🟢
    ├── tailwind.config.ts              # Tailwind CSS configuration file. 🟢
    ├── tsconfig.app.json               # TypeScript configuration specific to the application. 🟢
    ├── tsconfig.json                   # Root TypeScript configuration for the project. 🟢
    ├── tsconfig.node.json              # TypeScript configuration for Node.js environment (used by Vite). 🟢
    └── vite.config.ts                  # Vite build tool configuration. 🟢
    ```