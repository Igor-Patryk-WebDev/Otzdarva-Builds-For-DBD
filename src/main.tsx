import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

// Import the generated route tree
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ProfileBuildsPortalProvider } from "@contexts/ProfileBuildsPortalContext";
import { BuildEditorPortalProvider } from "@contexts/BuildEditor";
import { AppDataProvider } from "@contexts/AppDataContext";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AppDataProvider>
        <ProfileBuildsPortalProvider>
          <BuildEditorPortalProvider>
            <StrictMode>
              <RouterProvider router={router} />
            </StrictMode>
          </BuildEditorPortalProvider>
        </ProfileBuildsPortalProvider>
      </AppDataProvider>
    </QueryClientProvider>,
  );
}

