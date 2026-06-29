"use client";

import { useRouter } from "next/navigation";
import { Menu, ExternalLink, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth/mock-auth";
import { usePanelStore } from "@/lib/store/panel-store";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const { data } = usePanelStore();
  const firstName = data.barber.master.split(" ")[0];

  function handleSignOut() {
    signOut();
    router.replace("/panel/login");
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-bg/80 px-5 py-3.5 backdrop-blur-md sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          aria-label="Menüyü aç"
          className="rounded-lg border border-line p-2 text-muted transition hover:border-brass/40 hover:text-ink lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="font-sans text-sm text-muted">
          Merhaba, <span className="font-medium text-ink">{firstName}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 font-sans text-sm font-medium text-muted transition hover:border-brass/40 hover:text-ink sm:inline-flex"
        >
          <ExternalLink className="h-4 w-4" />
          Siteyi gör
        </a>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-sans text-sm font-medium text-muted transition hover:border-red-400/40 hover:text-red-300/90"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Çıkış</span>
        </button>
      </div>
    </header>
  );
}
