"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function LeadActionButtons({
  businessId,
  leadId,
  whatsappNumber,
  message,
}: {
  businessId: string;
  leadId: string;
  whatsappNumber: string;
  message: string;
}) {
  const [loading, setLoading] = useState(false);

  async function markAsSold() {
    setLoading(true);
    const response = await fetch(`/api/app/${businessId}/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sold" }),
    });
    setLoading(false);
    if (response.ok) window.location.reload();
  }

  function openWhatsApp() {
    window.location.href = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="actions">
      <button className="button primary" type="button" onClick={markAsSold} disabled={loading} aria-busy={loading}>
        {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
        {loading ? "Marcando..." : "Marcar como vendido"}
      </button>
      <button className="button secondary" type="button" onClick={openWhatsApp}>
        <MessageCircle size={18} /> Abrir WhatsApp
      </button>
    </div>
  );
}
