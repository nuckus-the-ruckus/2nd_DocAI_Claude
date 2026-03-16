// src/components/steps/Step1General.tsx
import React from "react";

interface Step1Props {
  name: string;
  onChange: (name: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "28px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "28px",
    lineHeight: 1.6,
  },
  fieldLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
  },
  required: {
    color: "#ef4444",
    marginLeft: "3px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.15s",
    background: "#fff",
  },
  helperText: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "8px",
    lineHeight: 1.5,
  },
  infoBox: {
    marginTop: "28px",
    background: "#f0f9ff",
    border: "1px solid #bae6fd",
    borderRadius: "8px",
    padding: "14px 16px",
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
  },
  infoIcon: {
    flexShrink: 0,
    marginTop: "1px",
    color: "#0ea5e9",
  },
  infoText: {
    fontSize: "13px",
    color: "#0369a1",
    lineHeight: 1.6,
  },
};

export default function Step1General({ name, onChange }: Step1Props) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>General Information</h2>
      <p style={styles.subtitle}>
        Name this classification so your team can identify the type of
        documents it applies to.
      </p>

      <label style={styles.fieldLabel}>
        Classification Name <span style={styles.required}>*</span>
      </label>
      <input
        style={{
          ...styles.input,
          borderColor: focused ? "#6366f1" : name ? "#d1d5db" : "#e5e7eb",
          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
        }}
        type="text"
        placeholder="e.g. Master Service Agreement, Invoice, NDA…"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus
      />
      <p style={styles.helperText}>
        This name identifies the classification in lists, filters, and
        document views. It does not affect what the AI extracts.
      </p>

      <div style={styles.infoBox}>
        <span style={styles.infoIcon}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#0ea5e9" strokeWidth="1.5" />
            <path
              d="M8 7v4M8 5.5v.5"
              stroke="#0ea5e9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p style={styles.infoText}>
          <strong>How AI Classification works:</strong> The AI automatically
          extracts all available fields from every document. This
          classification controls which of those fields are shown to users
          when they view a document. It does not change what the AI
          processes.
        </p>
      </div>
    </div>
  );
}
