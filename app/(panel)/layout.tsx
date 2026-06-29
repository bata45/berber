"use client";

import type { ReactNode } from "react";
import { PanelProvider } from "@/lib/store/panel-store";
import { PanelShell } from "@/components/panel/PanelShell";

/**
 * Panel route group düzeni. Kök app/layout.tsx (html/body/fontlar) miras alınır;
 * burada yalnızca panel çatısı (store + kimlik kapısı + sidebar/topbar) sarılır.
 * Public site (app/page.tsx) bu düzenden tamamen izole.
 */
export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <PanelProvider>
      <PanelShell>{children}</PanelShell>
    </PanelProvider>
  );
}
