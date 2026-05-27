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

  async function save(nextStatus: LeadStatus) {
    setValue(nextStatus);
    await fetch(`/api/app/${businessId}/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
  }

  return (
    <select className="select" value={value} onChange={(event) => save(event.target.value as LeadStatus)}>
      <option value="new">Novo</option>
      <option value="contacted">Contatado</option>
      <option value="in_progress">Em atendimento</option>
      <option value="sold">Vendido</option>
      <option value="lost">Perdido</option>
    </select>
  );
}
