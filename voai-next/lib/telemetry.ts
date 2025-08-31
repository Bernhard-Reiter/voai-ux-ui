import { headers } from "next/headers";
export const track = (event: string, props?: Record<string, unknown>) => {
  if (typeof window !== "undefined") (window as any).va?.("track", event, props);
  try { console.info(JSON.stringify({ event, props, requestId: headers().get("x-request-id") })); } catch {}
};