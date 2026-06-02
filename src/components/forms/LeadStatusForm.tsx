"use client";

import { useState } from "react";
import type { LeadStatus } from "@/types/domain";

export function LeadStatusForm({
  businessId,
  leadId,
  status,
}: {
  businessId: string;
  leadId: string;
  status: LeadStatus;
}) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function save(nextStatus: LeadStatus) {
    const previousStatus = value;
    setValue(nextStatus);
    setSaving(true);
    try {
      const response = await fetch(`/api/app/${businessId}/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!response.ok) setValue(previousStatus);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="field-with-status">
      <select
        className="select"
        value={value}
        onChange={(event) => save(event.target.value as LeadStatus)}
        disabled={saving}
        aria-busy={saving}
      >
        <option value="new">Novo</option>
        <option value="contacted">Contatado</option>
        <option value="in_progress">Em atendimento</option>
        <option value="sold">Vendido</option>
        <option value="lost">Perdido</option>
      </select>
      {saving ? (
        <span className="inline-status">
          <span className="inline-spinner" aria-hidden="true" /> Salvando status...
        </span>
      ) : null}
    </div>
  );
}
