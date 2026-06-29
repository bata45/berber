"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { signIn } from "@/lib/auth/mock-auth";
import { cn } from "@/lib/utils";

const INPUT_CLASS =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 font-sans text-sm text-ink placeholder:text-muted2 focus:border-brass focus:outline-none";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Küçük gecikme — gerçek bir istek hissi (prototip).
    setTimeout(() => {
      if (signIn(email, password)) {
        router.replace("/panel");
      } else {
        setError("E-posta veya şifre hatalı.");
        setLoading(false);
      }
    }, 450);
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        {/* Marka */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="pole mb-5 h-12 w-3 rounded-full" aria-hidden="true" />
          <p className="eyebrow">
            <span className="h-px w-6 bg-brass" />
            Yönetim Paneli
          </p>
          <h1 className="mt-3 font-display font-medium text-ink display-md">
            Hoş geldiniz
          </h1>
          <p className="mt-2 font-sans text-sm text-muted">
            Dükkanınızı yönetmek için giriş yapın.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card grain relative overflow-hidden p-6 sm:p-7">
          <div className="relative z-10 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-sans text-sm font-medium text-muted"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="berber@demo.com"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-sans text-sm font-medium text-muted"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={INPUT_CLASS}
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-300/90">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn("btn-brass w-full", loading && "opacity-70")}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Giriş Yap
                </>
              )}
            </button>
          </div>
        </form>

        {/* FAZ 2: Demo bilgileri — gerçek auth bağlanınca kaldır. */}
        <div className="mt-5 rounded-lg border border-line bg-surface/40 p-3.5 text-center">
          <p className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-muted2">
            Demo Girişi
          </p>
          <p className="mt-1.5 font-sans text-sm text-muted">
            <span className="text-ink">berber@demo.com</span>
            {"  ·  "}
            <span className="text-ink">berber123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
