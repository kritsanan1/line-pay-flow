# Available Scripts

    This document outlines the npm scripts available in this project, their purpose, and how to use them. These scripts are defined in the `package.json` file.

    ## `npm run dev`

    *   **Purpose**: Starts the development server. This command is used during local development to run the application with hot-reloading and a live preview.
    *   **Functionality**: Uses Vite to serve the React application. It watches for file changes and automatically reloads the browser, providing a fast development experience.
    *   **Usage Example**:
        ```bash
        npm run dev
        ```
    *   **Expected Output**: The console will display messages indicating that the Vite development server has started, along with the local URL where the application is accessible (e.g., `http://localhost:8080`).
    *   **Common Use Cases**:
        *   Developing new features.
        *   Debugging issues in the frontend.
        *   Making real-time UI changes.
    *   **Required Environment Variables**: None directly for the script, but the application might require `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` for connecting to Supabase.

    ## `npm run build`

    *   **Purpose**: Builds the project for production deployment.
    *   **Functionality**: Compiles and optimizes the React application using Vite, generating static assets (HTML, CSS, JavaScript) that can be deployed to any static hosting service. The output is placed in the `dist` directory.
    *   **Usage Example**:
        ```bash
        npm run build
        ```
    *   **Expected Output**: The console will show progress of the build process, including bundling, minification, and asset generation. Upon completion, it will indicate the size of the generated files.
    *   **Common Use Cases**:
        *   Preparing the application for deployment to a live environment.
        *   Generating a production-ready bundle for performance testing.

    ## `npm run build:dev`

    *   **Purpose**: Builds the project in development mode.
    *   **Functionality**: Similar to `npm run build`, but it uses Vite's development mode settings. This typically means less aggressive optimization and potentially more verbose output, which can be useful for debugging a built version of the application without full production optimizations.
    *   **Usage Example**:
        ```bash
        npm run build:dev
        ```
    *   **Expected Output**: Similar to `npm run build`, but with development-specific build logs.
    *   **Common Use Cases**:
        *   Debugging issues that only appear in a built version of the application.
        *   Testing the build process without full optimization.

    ## `npm run lint`

    *   **Purpose**: Runs ESLint to check for code quality issues and enforce coding standards.
    *   **Functionality**: Executes ESLint across the project files (`.`) to identify potential errors, stylistic inconsistencies, and adherence to configured rules (defined in `eslint.config.js`).
    *   **Usage Example**:
        ```bash
        npm run lint
        ```
    *   **Expected Output**: The console will display any linting errors or warnings found, along with their file paths and line numbers. If no issues are found, it will indicate that.
    *   **Common Use Cases**:
        *   Maintaining code quality and consistency.
        *   Identifying potential bugs early in the development cycle.
        *   As a pre-commit hook or part of CI/CD pipelines.

    ## `npm run preview`

    *   **Purpose**: Serves the production build locally for previewing.
    *   **Functionality**: After running `npm run build`, this command uses Vite to serve the static files from the `dist` directory. This allows you to test the production build locally before actual deployment.
    *   **Usage Example**:
        ```bash
        npm run preview
        ```
    *   **Expected Output**: The console will show the local URL where the production build is being served (e.g., `http://localhost:4173`).
    *   **Common Use Cases**:
        *   Verifying the production build's functionality and appearance.
        *   Performing final checks before deploying to a live environment.