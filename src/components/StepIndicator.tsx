// src/components/StepIndicator.tsx
import React from "react";

interface Step {
  label: string;
  number: number;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    marginBottom: "32px",
  },
  stepWrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  stepInner: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  circle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "13px",
    flexShrink: 0,
    transition: "background 0.2s, border-color 0.2s",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  connector: {
    flex: 1,
    height: "2px",
    margin: "0 12px",
  },
};

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isLast = index === steps.length - 1;

        const circleStyle: React.CSSProperties = {
          ...styles.circle,
          background: isCompleted ? "#6366f1" : isActive ? "#6366f1" : "#fff",
          border: isCompleted || isActive ? "2px solid #6366f1" : "2px solid #d1d5db",
          color: isCompleted || isActive ? "#fff" : "#9ca3af",
        };

        const labelStyle: React.CSSProperties = {
          ...styles.label,
          color: isActive ? "#6366f1" : isCompleted ? "#374151" : "#9ca3af",
        };

        const connectorStyle: React.CSSProperties = {
          ...styles.connector,
          background: isCompleted ? "#6366f1" : "#e5e7eb",
        };

        return (
          <div key={step.number} style={styles.stepWrapper}>
            <div style={styles.stepInner}>
              <div style={circleStyle}>
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l3.5 3.5L12 3.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span style={labelStyle}>{step.label}</span>
            </div>
            {!isLast && <div style={connectorStyle} />}
          </div>
        );
      })}
    </div>
  );
}
