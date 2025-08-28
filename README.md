# CWA Assignment 1: Dynamic Tab and Page Navigation

This is a Next.js project created for a CWA (Cloud Web Applications) assignment. It demonstrates a single-page application (SPA) architecture with several key features, including a dynamic tab management system and persistent navigation state.

The project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

*   **Component-Based Architecture**: Built with React and Next.js, leveraging a clean and modular component structure.
*   **Dynamic Tabs Component**:
    *   Add new tabs with a custom label and content.
    *   Switch between different tabs to view their content.
    *   Remove tabs individually.
    *   Generate a static, copyable HTML representation of the current tabs and their content.
*   **Persistent State**:
    *   **Tabs Data**: The tabs you create are saved to `localStorage`, so they will be there when you revisit the page.
    *   **Active Navigation**: The currently selected main navigation item (e.g., "About", "Tabs") is saved to a browser cookie, ensuring you land on the same page when you return.
*   **Responsive Navigation**: A collapsible hamburger menu for smaller screen sizes.
*   **Dark/Light Mode**: A theme toggler to switch between light and dark modes.
*   **Modern Tooling**:
    *   Built with TypeScript for type safety.
    *   Styled with CSS Modules to prevent class name conflicts.

## Project Structure

A brief overview of the key files and directories:

```
src/app/
├── About/              # Contains the 'About' page component.
├── Tabs/
│   ├── Tabs.tsx        # The core logic for the dynamic tabs feature.
│   └── Tabs.module.css # Styles for the Tabs component.
├── components/
│   ├── Footer/
│   ├── Hamburger/
│   ├── Header/         # Main header, assembles Navbar and other components.
│   ├── Mode/           # Dark/Light mode toggle component.
│   └── Navbar/         # The main navigation bar.
├── layout.tsx          # The root layout for the application.
└── page.tsx            # The main entry point that handles page rendering logic.
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation & Running

1.  Clone the repository:
    ```sh
    git clone <https://github.com/Gerudah/cwa-assignment>
    ```
2.  Navigate to the project directory and install NPM packages:
    ```sh
    npm install
    ```
3.  Run the development server:
    ```sh
    npm run dev
    ```

Open http://localhost:3000 with your browser to see the result.
