"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function AssistantCommandForm({ businessId }: { businessId: string }) {
  const [command, setCommand] = useState("Vendi um S20 FE");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`/api/app/${businessId}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    });
    const payload = await response.json();
    setMessage(payload.data?.message ?? "Não foi possível interpretar o comando.");
  }

  return (
    <form className="stack" onSubmit={submit}>
      <label>
        O que você quer fazer?
        <div className="search-box">
          <input className="input" value={command} onChange={(event) => setCommand(event.target.value)} />
          <button className="button primary">
            <Send size={18} /> Enviar
          </button>
        </div>
      </label>
      {message ? <div className="message assistant">{message}</div> : null}
    </form>
  );
}
