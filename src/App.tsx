// src/App.tsx
import React, { useState } from "react";
import StepIndicator from "./components/StepIndicator";
import SummaryPanel from "./components/SummaryPanel";
import Step1General from "./components/steps/Step1General";
import Step2Fields from "./components/steps/Step2Fields";
import Step3Rules from "./components/steps/Step3Rules";
import fieldGroups from "./data/fieldGroups";
import { WizardState } from "./types";

const STEPS = [
  { number: 1, label: "General Info" },
  { number: 2, label: "Configure Fields" },
  { number: 3, label: "Compliance Rules" },
];

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "32px 24px 80px",
  },
  maxWidth: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  pageHeader: {
    marginBottom: "28px",
  },
  breadcrumb: {
    fontSize: "12px",
    color: "#9ca3af",
    marginBottom: "6px",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#111827",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },
  layout: {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  },
  mainColumn: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  stepContent: {
    marginBottom: "20px",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },
  backBtn: {
    padding: "10px 22px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    color: "#374151",
    fontWeight: 500,
    fontSize: "14px",
    transition: "border-color 0.15s",
  },
  nextBtn: {
    padding: "10px 28px",
    border: "none",
    borderRadius: "8px",
    background: "#6366f1",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    transition: "background 0.15s, opacity 0.15s",
  },
  nextBtnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  finishBanner: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #a7f3d0",
    padding: "32px",
    textAlign: "center",
  },
  finishIcon: {
    width: "56px",
    height: "56px",
    background: "#d1fae5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  finishTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "8px",
  },
  finishSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  finishDetails: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "14px 20px",
    marginBottom: "24px",
  },
  finishDetailRow: {
    fontSize: "13px",
    color: "#4b5563",
  },
  restartBtn: {
    padding: "10px 24px",
    border: "none",
    borderRadius: "8px",
    background: "#6366f1",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
};

const initialState: WizardState = {
  name: "",
  selectedFields: new Set<string>(),
  customRules: [],
};

export default function App() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialState);
  const [finished, setFinished] = useState(false);

  const allFieldIds = fieldGroups.flatMap((g) => g.fields.map((f) => f.id));

  const handleToggleField = (id: string) => {
    setState((prev) => {
      const next = new Set(prev.selectedFields);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, selectedFields: next };
    });
  };

  const handleSelectAllGlobal = () => {
    setState((prev) => ({
      ...prev,
      selectedFields: new Set(allFieldIds),
    }));
  };

  const handleDeselectAllGlobal = () => {
    setState((prev) => ({
      ...prev,
      selectedFields: new Set<string>(),
    }));
  };

  const handleSelectGroupAll = (groupId: string) => {
    const group = fieldGroups.find((g) => g.id === groupId);
    if (!group) return;
    setState((prev) => {
      const next = new Set(prev.selectedFields);
      group.fields.forEach((f) => next.add(f.id));
      return { ...prev, selectedFields: next };
    });
  };

  const handleClearGroup = (groupId: string) => {
    const group = fieldGroups.find((g) => g.id === groupId);
    if (!group) return;
    setState((prev) => {
      const next = new Set(prev.selectedFields);
      group.fields.forEach((f) => next.delete(f.id));
      return { ...prev, selectedFields: next };
    });
  };

  const handleAddRule = (rule: string) => {
    setState((prev) => ({
      ...prev,
      customRules: [...prev.customRules, rule],
    }));
  };

  const handleRemoveRule = (index: number) => {
    setState((prev) => ({
      ...prev,
      customRules: prev.customRules.filter((_, i) => i !== index),
    }));
  };

  const canProceed = step === 1 ? state.name.trim().length > 0 : true;

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else setFinished(true);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleRestart = () => {
    setState(initialState);
    setStep(1);
    setFinished(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.maxWidth}>
        <div style={styles.pageHeader}>
          <p style={styles.breadcrumb}>
            Document Management &rsaquo; Classifications &rsaquo; New
          </p>
          <h1 style={styles.pageTitle}>Create AI Classification</h1>
          <p style={styles.pageSubtitle}>
            Define how extracted document data is displayed for this
            classification type.
          </p>
        </div>

        {!finished && (
          <StepIndicator currentStep={step} steps={STEPS} />
        )}

        <div style={styles.layout}>
          <div style={styles.mainColumn}>
            {finished ? (
              <div style={styles.finishBanner}>
                <div style={styles.finishIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 style={styles.finishTitle}>Classification Created</h2>
                <p style={styles.finishSubtitle}>
                  Your AI classification has been configured successfully.
                </p>
                <div style={styles.finishDetails}>
                  <p style={styles.finishDetailRow}>
                    <strong>Name:</strong> {state.name}
                  </p>
                  <p style={styles.finishDetailRow}>
                    <strong>Fields shown:</strong>{" "}
                    {state.selectedFields.size} of {allFieldIds.length}
                  </p>
                  <p style={styles.finishDetailRow}>
                    <strong>Compliance rules:</strong>{" "}
                    {state.customRules.length}
                  </p>
                </div>
                <button style={styles.restartBtn} onClick={handleRestart}>
                  Create Another
                </button>
              </div>
            ) : (
              <>
                <div style={styles.stepContent}>
                  {step === 1 && (
                    <Step1General
                      name={state.name}
                      onChange={(name) => setState((p) => ({ ...p, name }))}
                    />
                  )}
                  {step === 2 && (
                    <Step2Fields
                      fieldGroups={fieldGroups}
                      selectedFields={state.selectedFields}
                      onToggleField={handleToggleField}
                      onSelectAllGlobal={handleSelectAllGlobal}
                      onDeselectAllGlobal={handleDeselectAllGlobal}
                      onSelectGroupAll={handleSelectGroupAll}
                      onClearGroup={handleClearGroup}
                    />
                  )}
                  {step === 3 && (
                    <Step3Rules
                      rules={state.customRules}
                      onAddRule={handleAddRule}
                      onRemoveRule={handleRemoveRule}
                    />
                  )}
                </div>

                <div style={styles.navRow}>
                  {step > 1 ? (
                    <button
                      style={styles.backBtn}
                      onClick={handleBack}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#6366f1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "#e5e7eb")
                      }
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    style={{
                      ...styles.nextBtn,
                      ...(!canProceed ? styles.nextBtnDisabled : {}),
                    }}
                    onClick={handleNext}
                    disabled={!canProceed}
                    onMouseEnter={(e) => {
                      if (canProceed)
                        e.currentTarget.style.background = "#4f46e5";
                    }}
                    onMouseLeave={(e) => {
                      if (canProceed)
                        e.currentTarget.style.background = "#6366f1";
                    }}
                  >
                    {step === 3 ? "Create Classification" : "Continue →"}
                  </button>
                </div>
              </>
            )}
          </div>

          <SummaryPanel state={state} fieldGroups={fieldGroups} />
        </div>
      </div>
    </div>
  );
}
