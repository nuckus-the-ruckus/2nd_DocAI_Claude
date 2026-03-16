// src/components/SummaryPanel.tsx
import React from "react";
import { WizardState, FieldGroup } from "../types";

interface SummaryPanelProps {
  state: WizardState;
  fieldGroups: FieldGroup[];
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: "280px",
    flexShrink: 0,
    position: "sticky",
    top: "24px",
    alignSelf: "flex-start",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  heading: {
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#6b7280",
    marginBottom: "4px",
  },
  name: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#111827",
    wordBreak: "break-word",
  },
  placeholder: {
    fontSize: "14px",
    color: "#d1d5db",
    fontStyle: "italic",
  },
  divider: {
    height: "1px",
    background: "#f3f4f6",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "8px",
  },
  rowLabel: {
    fontSize: "13px",
    color: "#6b7280",
    flexShrink: 0,
  },
  rowValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    textAlign: "right",
  },
  badge: {
    display: "inline-block",
    background: "#ede9fe",
    color: "#6d28d9",
    borderRadius: "9999px",
    padding: "1px 10px",
    fontSize: "12px",
    fontWeight: 700,
  },
  ruleItem: {
    fontSize: "12px",
    color: "#4b5563",
    background: "#f9fafb",
    borderRadius: "6px",
    padding: "6px 10px",
    borderLeft: "3px solid #6366f1",
    wordBreak: "break-word",
  },
  noRules: {
    fontSize: "12px",
    color: "#d1d5db",
    fontStyle: "italic",
  },
  groupRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  groupLabel: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  groupValue: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#6b7280",
  },
};

export default function SummaryPanel({ state, fieldGroups }: SummaryPanelProps) {
  const totalSelected = state.selectedFields.size;

  return (
    <aside style={styles.panel}>
      {/* Classification Name */}
      <div>
        <p style={styles.heading}>Classification</p>
        {state.name ? (
          <p style={styles.name}>{state.name}</p>
        ) : (
          <p style={styles.placeholder}>Untitled…</p>
        )}
      </div>

      <div style={styles.divider} />

      {/* Fields */}
      <div style={styles.section}>
        <div style={{ ...styles.row, marginBottom: "4px" }}>
          <p style={styles.heading}>Fields Selected</p>
          <span style={styles.badge}>{totalSelected}</span>
        </div>
        {fieldGroups.map((group) => {
          const count = group.fields.filter((f) =>
            state.selectedFields.has(f.id)
          ).length;
          return (
            <div key={group.id} style={styles.groupRow}>
              <span style={styles.groupLabel}>{group.name}</span>
              <span style={styles.groupValue}>
                {count} / {group.fields.length}
              </span>
            </div>
          );
        })}
      </div>

      <div style={styles.divider} />

      {/* Rules */}
      <div style={styles.section}>
        <div style={styles.row}>
          <p style={styles.heading}>Compliance Rules</p>
          <span style={styles.badge}>{state.customRules.length}</span>
        </div>
        {state.customRules.length === 0 ? (
          <p style={styles.noRules}>No rules added yet.</p>
        ) : (
          state.customRules.map((rule, i) => (
            <p key={i} style={styles.ruleItem}>
              {rule}
            </p>
          ))
        )}
      </div>
    </aside>
  );
}
