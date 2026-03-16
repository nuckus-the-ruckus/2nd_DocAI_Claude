// src/types.ts

export interface Field {
  id: string;
  name: string;
  description?: string;
}

export interface FieldGroup {
  id: string;
  name: string;
  fields: Field[];
}

export interface WizardState {
  name: string;
  selectedFields: Set<string>;
  customRules: string[];
}
