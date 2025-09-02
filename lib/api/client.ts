import { newReqId } from "../utils/request-id";
import { z } from "zod";

export async function api<T>(path: string, schema: z.ZodSchema<T>, init: RequestInit = {}): Promise<T> {
  const reqId = newReqId();
  const headers = new Headers(init.headers);
  headers.set("X-Request-Id", reqId);
  headers.set("Content-Type", "application/json");

  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CORE_API_BASE}${path}`, { ...init, headers, cache: "no-store" });
    if (res.status === 429 || res.status >= 500) {
      await new Promise(r => setTimeout(r, 250 * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`API ${path} failed (${res.status}) req:${reqId}`);
    const json = await res.json();
    return schema.parse(json);
  }
  throw new Error(`API ${path} failed after retries req:${reqId}`);
}