"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { isAuthed } from "@/lib/auth/mock-auth";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const LOGIN_PATH = "/panel/login";

/**
 * Panel kabuğu: kimlik kapısı + sidebar/topbar yerleşimi.
 * Auth istemci tarafında kontrol edilir (prototip). Açık değilse login'e yönlendirir.
 *
 * FAZ 2 DİKİŞİ: `isAuthed()` Supabase `getSession()` ile değişir; ayrıca
 * SSR korumalı sayfalar için `middleware.ts` cookie kontrolü eklenir.
 */
export function PanelShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === LOGIN_PATH;

  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ok = isAuthed();
    setAuthed(ok);
    setChecked(true);
    if (!ok && !isLogin) {
      router.replace(LOGIN_PATH);
    } else if (ok && isLogin) {
      router.replace("/panel");
    }
  }, [isLogin, router]);

  useEffect(() => {
    document.title = isLogin
      ? "Giriş — Yönetim Paneli"
      : "Yönetim Paneli — Berber";
  }, [isLogin]);

  // Login sayfası: kabuk yok, çıplak içerik.
  if (isLogin) {
    return <>{children}</>;
  }

  // Kontrol sürerken ya da yetkisizken (yönlendirme anı) → yükleniyor.
  if (!checked || !authed) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brass" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
