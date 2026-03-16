// src/components/fields/FieldGroupSection.tsx
import React, { useState } from "react";
import { FieldGroup } from "../../types";

interface FieldGroupSectionProps {
  group: FieldGroup;
  selectedFields: Set<string>;
  onToggleField: (id: string) => void;
  onSelectAll: (groupId: string) => void;
  onClearGroup: (groupId: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    cursor: "pointer",
    userSelect: "none",
    gap: "12px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    minWidth: 0,
  },
  groupName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },
  countBadge: {
    fontSize: "11px",
    fontWeight: 600,
    background: "#ede9fe",
    color: "#6d28d9",
    borderRadius: "9999px",
    padding: "1px 8px",
    flexShrink: 0,
  },
  headerActions: {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
  },
  actionBtn: {
    fontSize: "12px",
    color: "#6366f1",
    background: "none",
    border: "none",
    padding: "2px 4px",
    fontWeight: 500,
    textDecoration: "underline",
    textDecorationColor: "transparent",
    transition: "text-decoration-color 0.15s",
  },
  chevron: {
    flexShrink: 0,
    transition: "transform 0.2s",
    color: "#9ca3af",
  },
  body: {
    borderTop: "1px solid #f3f4f6",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  fieldRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.1s",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    marginTop: "2px",
    accentColor: "#6366f1",
    flexShrink: 0,
    cursor: "pointer",
  },
  fieldName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#374151",
    lineHeight: 1.4,
  },
  fieldDesc: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "2px",
    lineHeight: 1.4,
  },
};

export default function FieldGroupSection({
  group,
  selectedFields,
  onToggleField,
  onSelectAll,
  onClearGroup,
}: FieldGroupSectionProps) {
  const [open, setOpen] = useState(true);

  const selectedCount = group.fields.filter((f) =>
    selectedFields.has(f.id)
  ).length;

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectAll(group.id);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClearGroup(group.id);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header} onClick={() => setOpen((o) => !o)}>
        <div style={styles.headerLeft}>
          <span style={styles.groupName}>{group.name}</span>
          <span style={styles.countBadge}>
            {selectedCount} / {group.fields.length}
          </span>
        </div>
        <div style={styles.headerActions}>
          <button
            style={styles.actionBtn}
            onClick={handleSelectAll}
            title="Select all in this group"
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecorationColor = "#6366f1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecorationColor = "transparent")
            }
          >
            Select all
          </button>
          <button
            style={styles.actionBtn}
            onClick={handleClear}
            title="Clear all in this group"
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecorationColor = "#6366f1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecorationColor = "transparent")
            }
          >
            Clear
          </button>
        </div>
        <svg
          style={{
            ...styles.chevron,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {open && (
        <div style={styles.body}>
          {group.fields.map((field) => {
            const checked = selectedFields.has(field.id);
            return (
              <label
                key={field.id}
                style={{
                  ...styles.fieldRow,
                  background: checked ? "#faf5ff" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!checked)
                    e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = checked
                    ? "#faf5ff"
                    : "transparent";
                }}
              >
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={checked}
                  onChange={() => onToggleField(field.id)}
                />
                <div>
                  <p style={styles.fieldName}>{field.name}</p>
                  {field.description && (
                    <p style={styles.fieldDesc}>{field.description}</p>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
