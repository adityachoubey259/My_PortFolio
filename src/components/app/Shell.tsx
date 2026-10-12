import { Suspense, type ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="os-loading">Loading ADITYA OS...</div>}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
