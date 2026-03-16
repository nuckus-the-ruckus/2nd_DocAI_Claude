// src/data/fieldGroups.ts
import { FieldGroup } from "../types";

const fieldGroups: FieldGroup[] = [
  {
    id: "document-metadata",
    name: "Document Metadata",
    fields: [
      {
        id: "doc-title",
        name: "Document Title",
        description: "The full title extracted from the document header.",
      },
      {
        id: "doc-date",
        name: "Document Date",
        description: "The primary date associated with the document.",
      },
      {
        id: "doc-author",
        name: "Author",
        description: "Name of the individual or entity who authored the document.",
      },
      {
        id: "doc-version",
        name: "Version",
        description: "Version number or label if present.",
      },
    ],
  },
  {
    id: "parties",
    name: "Parties & Signatories",
    fields: [
      {
        id: "party-name",
        name: "Party Name",
        description: "Legal name of a contracting or involved party.",
      },
      {
        id: "party-role",
        name: "Party Role",
        description: "Role of the party (e.g., Buyer, Seller, Licensor).",
      },
      {
        id: "signatory-name",
        name: "Signatory Name",
        description: "Name of the individual who signed the document.",
      },
      {
        id: "signatory-title",
        name: "Signatory Title",
        description: "Job title of the signatory.",
      },
      {
        id: "signatory-date",
        name: "Signature Date",
        description: "Date on which the document was signed.",
      },
    ],
  },
  {
    id: "financial",
    name: "Financial Terms",
    fields: [
      {
        id: "contract-value",
        name: "Contract Value",
        description: "Total monetary value of the agreement.",
      },
      {
        id: "currency",
        name: "Currency",
        description: "Currency in which amounts are denominated.",
      },
      {
        id: "payment-terms",
        name: "Payment Terms",
        description: "Schedule or conditions for payment.",
      },
      {
        id: "penalty-clause",
        name: "Penalty / Liquidated Damages",
        description: "Any penalty amounts or liquidated damages clauses.",
      },
    ],
  },
  {
    id: "dates-duration",
    name: "Dates & Duration",
    fields: [
      {
        id: "effective-date",
        name: "Effective Date",
        description: "Date the agreement becomes legally binding.",
      },
      {
        id: "expiry-date",
        name: "Expiry Date",
        description: "Date the agreement expires or terminates.",
      },
      {
        id: "renewal-date",
        name: "Renewal Date",
        description: "Date on which the agreement auto-renews, if applicable.",
      },
      {
        id: "notice-period",
        name: "Notice Period",
        description: "Required advance notice before termination.",
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Jurisdiction",
    fields: [
      {
        id: "governing-law",
        name: "Governing Law",
        description: "Jurisdiction whose laws govern the agreement.",
      },
      {
        id: "dispute-resolution",
        name: "Dispute Resolution",
        description: "Method for resolving disputes (e.g., arbitration, litigation).",
      },
      {
        id: "confidentiality",
        name: "Confidentiality Clause",
        description: "Indicates whether an NDA or confidentiality clause is present.",
      },
      {
        id: "data-protection",
        name: "Data Protection / GDPR",
        description: "References to data protection obligations.",
      },
    ],
  },
];

export default fieldGroups;
