import { notFound } from "@/lib/backend/errors";

type ApiEnvelope<T> = { data: T } | { error: { code: string; message: string } };

export async function apiGet<T>(path: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000";
  const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || "error" in payload) {
    throw notFound("Recurso não encontrado");
  }

  return payload.data;
}
