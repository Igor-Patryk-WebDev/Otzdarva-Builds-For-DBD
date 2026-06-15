import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <main className="h-full">
    <Outlet />
  </main>
);

export const Route = createRootRoute({ component: RootLayout });
