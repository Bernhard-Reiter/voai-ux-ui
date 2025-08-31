import { headers } from "next/headers";
export const track = async (event: string, props?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    const w = window as Window & { va?: (action: string, event: string, props?: Record<string, unknown>) => void };
    w.va?.("track", event, props);
  }
  try { 
    const headersList = await headers();
    console.info(JSON.stringify({ event, props, requestId: headersList.get("x-request-id") })); 
  } catch {}
};