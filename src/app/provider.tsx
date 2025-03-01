"use client";

import { SessionProvider } from "next-auth/react";
import { LoginDialogProvider } from "~/hooks/use-login";
import { TRPCReactProvider } from "~/trpc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCReactProvider>
        <LoginDialogProvider>{children}</LoginDialogProvider>
      </TRPCReactProvider>
    </SessionProvider>
  );
}
