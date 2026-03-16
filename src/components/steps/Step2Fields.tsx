// src/components/steps/Step2Fields.tsx
import React from "react";
import { FieldGroup } from "../../types";
import FieldGroupSection from "../fields/FieldGroupSection";

interface Step2Props {
  fieldGroups: FieldGroup[];
  selectedFields: Set<string>;
  onToggleField: (id: string) => void;
  onSelectAllGlobal: () => void;
  onDeselectAllGlobal: () => void;
  onSelectGroupAll: (groupId: string) => void;
  onClearGroup: (groupId: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  topCard: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "20px 24px",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
  },
  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px",
    lineHeight: 1.5,
  },
  globalActions: {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
    alignItems: "center",
  },
  outlineBtn: {
    padding: "7px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "7px",
    background: "#fff",
    color: "#374151",
    fontWeight: 500,
    fontSize: "13px",
    transition: "border-color 0.15s, color 0.15s",
  },
  primaryBtn: {
    padding: "7px 14px",
    border: "1.5px solid #6366f1",
    borderRadius: "7px",
    background: "#6366f1",
    color: "#fff",
    fontWeight: 500,
    fontSize: "13px",
    transition: "background 0.15s",
  },
  notice: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: 1.5,
  },
  noFieldsNotice: {
    background: "#fafafa",
    border: "1px solid #e5e7eb",
    color: "#6b7280",
  },
  manyFieldsNotice: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    color: "#92400e",
  },
};

export default function Step2Fields({
  fieldGroups,
  selectedFields,
  onToggleField,
  onSelectAllGlobal,
  onDeselectAllGlobal,
  onSelectGroupAll,
  onClearGroup,
}: Step2Props) {
  const totalFields = fieldGroups.reduce((sum, g) => sum + g.fields.length, 0);
  const selectedCount = selectedFields.size;
  const noFieldsSelected = selectedCount === 0;
  const manyFieldsSelected = selectedCount > Math.floor(totalFields * 0.75);

  return (
    <div style={styles.wrapper}>
      <div style={styles.topCard}>
        <div style={styles.titleRow}>
          <div>
            <h2 style={styles.title}>Configure Fields</h2>
            <p style={styles.subtitle}>
              Choose which extracted fields are shown on documents under this
              classification.
              <br />
              The AI always extracts all fields — this only controls
              visibility.
            </p>
          </div>
          <div style={styles.globalActions}>
            <button
              style={styles.outlineBtn}
              onClick={onDeselectAllGlobal}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.color = "#6366f1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.color = "#374151";
              }}
            >
              Deselect all
            </button>
            <button
              style={styles.primaryBtn}
              onClick={onSelectAllGlobal}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#4f46e5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#6366f1")
              }
            >
              Select all
            </button>
          </div>
        </div>
      </div>

      {noFieldsSelected && (
        <div style={{ ...styles.notice, ...styles.noFieldsNotice }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0, marginTop: "1px" }}
          >
            <circle cx="8" cy="8" r="7" stroke="#9ca3af" strokeWidth="1.5" />
            <path
              d="M8 7v4M8 5.5v.5"
              stroke="#9ca3af"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>
            <strong>No fields selected.</strong> Documents classified under
            this AI classification will not display extracted data.
          </span>
        </div>
      )}

      {!noFieldsSelected && manyFieldsSelected && (
        <div style={{ ...styles.notice, ...styles.manyFieldsNotice }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0, marginTop: "1px" }}
          >
            <path
              d="M8 2L14 13H2L8 2z"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 6v3.5M8 11v.5"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>
            <strong>Many fields selected ({selectedCount}).</strong> Showing
            a large number of fields may make documents harder to review.
            Consider keeping only the fields most relevant to this
            classification.
          </span>
        </div>
      )}

      {fieldGroups.map((group) => (
        <FieldGroupSection
          key={group.id}
          group={group}
          selectedFields={selectedFields}
          onToggleField={onToggleField}
          onSelectAll={onSelectGroupAll}
          onClearGroup={onClearGroup}
        />
      ))}
    </div>
  );
}
