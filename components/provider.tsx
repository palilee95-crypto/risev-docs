'use client';

/**
 * The Help Centre is a bespoke, light-only design, so there is no theme
 * provider to configure. This wrapper exists so a future provider (analytics,
 * a toast host) has one place to live.
 */
export function CustomRootProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
