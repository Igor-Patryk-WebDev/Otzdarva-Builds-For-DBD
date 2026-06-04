import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <main>
    <Outlet />
  </main>
);

export const Route = createRootRoute({ component: RootLayout });
