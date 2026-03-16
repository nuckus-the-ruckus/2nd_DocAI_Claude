// src/components/steps/Step3Rules.tsx
import React, { useState } from "react";

interface Step3Props {
  rules: string[];
  onAddRule: (rule: string) => void;
  onRemoveRule: (index: number) => void;
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
    marginBottom: "24px",
    lineHeight: 1.6,
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
  },
  textarea: {
    flex: 1,
    padding: "10px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#111827",
    resize: "vertical",
    minHeight: "60px",
    outline: "none",
    lineHeight: 1.5,
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
  addBtn: {
    padding: "10px 18px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "13px",
    alignSelf: "flex-end",
    transition: "background 0.15s",
    flexShrink: 0,
  },
  addBtnDisabled: {
    background: "#e5e7eb",
    color: "#9ca3af",
    cursor: "not-allowed",
  },
  sectionLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "10px",
  },
  ruleList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  ruleItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    background: "#f9fafb",
    borderRadius: "8px",
    padding: "12px 14px",
    borderLeft: "3px solid #6366f1",
  },
  ruleText: {
    flex: 1,
    fontSize: "13px",
    color: "#374151",
    lineHeight: 1.5,
    wordBreak: "break-word",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#d1d5db",
    padding: "2px",
    flexShrink: 0,
    transition: "color 0.15s",
    lineHeight: 1,
  },
  emptyState: {
    textAlign: "center",
    padding: "28px",
    color: "#d1d5db",
    fontSize: "13px",
    border: "1.5px dashed #e5e7eb",
    borderRadius: "8px",
  },
  examplesBox: {
    marginTop: "24px",
    background: "#f9fafb",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    padding: "14px 16px",
  },
  examplesTitle: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "8px",
  },
  exampleItem: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: 1.7,
  },
};

export default function Step3Rules({ rules, onAddRule, onRemoveRule }: Step3Props) {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAddRule(trimmed);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const canAdd = draft.trim().length > 0;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Custom Compliance Rules</h2>
      <p style={styles.subtitle}>
        Add plain-language rules that describe compliance expectations for
        documents under this classification. These rules are stored with the
        classification for reference and future automation.
      </p>

      <div style={styles.inputRow}>
        <textarea
          style={{
            ...styles.textarea,
            borderColor: focused ? "#6366f1" : "#e5e7eb",
            boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
          }}
          placeholder="e.g. Contract value must be stated in USD. Governing law must be specified."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button
          style={{
            ...styles.addBtn,
            ...(canAdd ? {} : styles.addBtnDisabled),
          }}
          onClick={handleAdd}
          disabled={!canAdd}
          onMouseEnter={(e) => {
            if (canAdd) e.currentTarget.style.background = "#4f46e5";
          }}
          onMouseLeave={(e) => {
            if (canAdd) e.currentTarget.style.background = "#6366f1";
          }}
        >
          Add Rule
        </button>
      </div>

      {rules.length > 0 && (
        <p style={styles.sectionLabel}>
          {rules.length} rule{rules.length !== 1 ? "s" : ""} added
        </p>
      )}

      {rules.length === 0 ? (
        <div style={styles.emptyState}>
          No rules added yet. Rules are optional.
        </div>
      ) : (
        <div style={styles.ruleList}>
          {rules.map((rule, i) => (
            <div key={i} style={styles.ruleItem}>
              <p style={styles.ruleText}>{rule}</p>
              <button
                style={styles.removeBtn}
                onClick={() => onRemoveRule(i)}
                title="Remove rule"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ef4444")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#d1d5db")
                }
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={styles.examplesBox}>
        <p style={styles.examplesTitle}>Example rules</p>
        <p style={styles.exampleItem}>
          • Governing law clause must identify a specific jurisdiction.
        </p>
        <p style={styles.exampleItem}>
          • Contract value must be explicitly stated in the document.
        </p>
        <p style={styles.exampleItem}>
          • Both parties must be identified with full legal names.
        </p>
        <p style={styles.exampleItem}>
          • Effective date and expiry date must both be present.
        </p>
      </div>
    </div>
  );
}
