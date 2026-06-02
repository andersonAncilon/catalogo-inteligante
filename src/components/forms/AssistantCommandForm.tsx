"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function AssistantCommandForm({ businessId }: { businessId: string }) {
  const [command, setCommand] = useState("Vendi um S20 FE");
  const [message, setMessage] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch(`/api/app/${businessId}/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const payload = await response.json();
      setActionId(payload.data?.confirmationRequired ? payload.data.actionId : null);
      setMessage(payload.data?.message ?? "Não foi possível interpretar o comando.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirm() {
    if (!actionId) return;
    setConfirming(true);
    try {
      const response = await fetch(`/api/app/${businessId}/assistant`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionId }),
      });
      const payload = await response.json();
      setActionId(null);
      setMessage(payload.data?.message ?? "Não foi possível confirmar a ação.");
    } finally {
      setConfirming(false);
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      <label>
        O que você quer fazer?
        <div className="search-box">
          <input className="input" value={command} onChange={(event) => setCommand(event.target.value)} />
          <button className="button primary" type="submit" disabled={submitting || confirming} aria-busy={submitting}>
            {submitting ? <span className="button-spinner" aria-hidden="true" /> : <Send size={18} />}
            {submitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </label>
      {message ? <div className="message assistant">{message}</div> : null}
      {actionId ? (
        <button className="button primary" type="button" onClick={confirm} disabled={submitting || confirming} aria-busy={confirming}>
          {confirming ? <span className="button-spinner" aria-hidden="true" /> : null}
          {confirming ? "Confirmando..." : "Confirmar alteração"}
        </button>
      ) : null}
    </form>
  );
}
