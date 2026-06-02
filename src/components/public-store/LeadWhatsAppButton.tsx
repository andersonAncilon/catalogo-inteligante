"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

type LeadWhatsAppButtonProps = {
  storeSlug: string;
  whatsappNumber: string;
  label: string;
  originalQuery: string;
  productId?: string;
  searchSessionId?: string;
  leadSource?: "store_search" | "product_page" | "whatsapp_click";
};

export function LeadWhatsAppButton({
  storeSlug,
  whatsappNumber,
  label,
  originalQuery,
  productId,
  searchSessionId,
  leadSource = "whatsapp_click",
}: LeadWhatsAppButtonProps) {
  const [loading, setLoading] = useState(false);

  async function registerAndOpen() {
    setLoading(true);
    try {
      await fetch(`/api/public/${storeSlug}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          searchSessionId,
          originalQuery,
          leadSource,
          whatsappClicked: true,
        }),
      });

      const message = encodeURIComponent(originalQuery);
      window.location.href = `https://wa.me/${normalizePhone(whatsappNumber)}?text=${message}`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="button primary" type="button" onClick={registerAndOpen} disabled={loading} aria-busy={loading}>
      {loading ? <span className="button-spinner" aria-hidden="true" /> : <MessageCircle size={18} />}
      {loading ? "Abrindo..." : label}
    </button>
  );
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}
