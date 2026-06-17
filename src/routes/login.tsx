import { Button } from "@components/shared/Button";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPending) {
      login();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-zinc-950/40 overflow-hidden">
      <div className="shadow-2xl shadow-black w-full max-w-lg bg-black border border-neutral-800 rounded-lg overflow-hidden">
        {/* DBD Perk Header Style */}
        <div className="relative overflow-clip px-6 py-4 border-b border-neutral-800">
          <div className="absolute inset-0 bg-[url(/images/CharPortrait_roleBG.webp)] bg-size-[150%] bg-center killers-filter z-0" />
          <h3 className="text-3xl font-bold text-white border-b border-white/20 pb-2">
            Login
          </h3>
          <p className="text-sm font-extralight italic text-neutral-300 pt-2">
            Fill in the form to log in to Build Creator.
          </p>
        </div>
        <div className="bg-neutral-900 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1 font-semibold">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-otz transition duration-200 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus:border-otz transition duration-200 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isError && (
              <div className="text-sm text-red-400 bg-red-950/30 border border-red-500/20 rounded-lg px-4 py-3 text-center">
                Invalid username or password
              </div>
            )}

            <Button
              type="submit"
              color="otz"
              className="bg-otz w-full py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-2 rounded-lg"
            >
              {isPending ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
