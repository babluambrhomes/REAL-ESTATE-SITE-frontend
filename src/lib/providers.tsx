"use client";

import { ReactQueryProvider } from "./react-query/provider";
import { ReduxProvider } from "./redux/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}
