// src/routes/login.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    mutate: login,
    isError,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
    onSuccess: () => router.navigate({ to: "/buildCreator" }),
  });

  return (
    <div className="flex flex-col gap-10 max-w-sm border-otz border-2 rounded-2xl">
      <input
        type="text"
        placeholder="Username"
        className="border-otz border-2 rounded-2xl"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-otz border-2 rounded-2xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isError && <p>Invalid credentials</p>}
      <button
        onClick={() => login()}
        disabled={isPending}
        className="border-otz border-2 rounded-2xl"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
