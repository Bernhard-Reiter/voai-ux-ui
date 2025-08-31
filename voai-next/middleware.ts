import type { NextRequest } from "next/server";
export const config = { matcher: ["/api/:path*", "/(app)/dashboard/:path*"] };

const WINDOW_MS = 15_000;
const MAX = 60;
const mem = new Map<string, { count: number; ts: number }>();

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  const now = Date.now();
  const item = mem.get(ip);
  if (!item || now - item.ts > WINDOW_MS) mem.set(ip, { count: 1, ts: now });
  else item.count++;
  if (mem.get(ip)!.count > MAX) return new Response("Rate limit", { status: 429 });
  return;
}