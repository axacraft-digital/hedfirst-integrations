 #Teligant Integration Settings UI Prototype
 
 ## Project Overview

  This is a **UI prototype** for the Teligant platform's tenant integration configuration screens. We are building a clickable demo to validate UX
  patterns before implementing in the production NestJS/Next.js codebase.

  **This is NOT production code** - it's a design prototype using mock JSON data.

  ---

  ## Why We're Building This

  ### Business Context

  Teligant is a multi-tenant telehealth B2B SaaS platform. Each tenant (healthcare organization) needs their own integration credentials for
  third-party services:

  - **DoseSpot** - E-prescribing (clinic ID, API keys)
  - **PayTheory** - Payment processing (merchant ID, secret keys)
  - **ShipStation** - Shipping/fulfillment (API credentials)
  - **Zoom** - Telemedicine video calls (OAuth credentials)
  - **ChooseHealth** - Lab services (API keys)
  - **ActiveCampaign** - Marketing automation (API keys)

  ### Technical Problem Being Solved

  Our developer (Sergei) is building a "cipher module" that uses **selective encryption**:
  - Non-sensitive config fields (IDs, names, feature flags) stored as readable JSON
  - Only the `secrets` property is encrypted with AES-256-GCM
  - API never returns decrypted secrets to clients

  This prototype demonstrates the **admin UI** for managing these configurations, including:
  - Viewing/editing non-sensitive settings
  - Write-only credential fields (masked, never returned by API)
  - Validation status indicators (green/red/yellow) showing if credentials work

  ---

  ## Tech Stack

  | Tool | Purpose |
  |------|---------|
  | **Vite** | Build tool |
  | **React** | UI framework |
  | **TypeScript** | Type safety |
  | **ShadcnUI** | Component library (TailwindCSS + RadixUI) |
  | **TanStack Router** | File-based routing |
  | **Lucide Icons** | Primary icons |
  | **Tabler Icons** | Brand icons only |
  | **Clerk** | Auth (partial - for layout/nav demo) |
  | **ESLint + Prettier** | Code quality |

  ---

  ## Screens to Build

  ### 1. Integration List View (`/settings/integrations`)

  Dashboard showing all available integrations with status at a glance:

  | Column | Description |
  |--------|-------------|
  | Integration name + icon | DoseSpot, PayTheory, etc. |
  | Status | Enabled/Disabled toggle state |
  | Credentials | 🟢 Valid / 🔴 Invalid / 🟡 Validating / ⚪ Not configured |
  | Last Validated | Timestamp of last credential check |
  | Action | "Manage" button to detail view |

  ### 2. Integration Detail View (`/settings/integrations/:integration`)

  Configuration panel for a single integration with two sections:

  **General Settings (readable/editable):**
  - Integration-specific fields (Clinic ID, Merchant ID, etc.)
  - Environment selector (Production/Sandbox)
  - Feature toggles (e.g., "EPCS Enabled" for DoseSpot)

  **Credentials (write-only):**
  - Masked password fields
  - "Last updated" metadata
  - Never populated from API (always empty or masked)
  - "Leave blank to keep existing" hint

  **Validation Status Banner:**
  - 🟢 Green: "Credentials Valid" + last validated timestamp
  - 🔴 Red: "Credentials Invalid" + error message + troubleshooting hints
  - 🟡 Yellow: "Validating..." spinner
  - ⚪ Gray: "Not Configured" + setup instructions

  **Actions:**
  - "Test Connection" button (triggers validation)
  - "Save Changes" button
  - "Cancel" button

  ### 3. States to Demonstrate

  For the demo, create views showing:

  1. **DoseSpot** - Fully configured, credentials VALID (🟢)
  2. **PayTheory** - Configured but credentials INVALID (🔴) with error message
  3. **ShipStation** - Not configured (⚪) - empty state with setup guidance
  4. **Zoom** - Currently validating (🟡) - loading state

  ---

  ## Mock Data Structure

  Create JSON files in `/src/mocks/` that mirror the API response format:

  ```typescript
  // types/integration.ts
  interface IntegrationConfig {
    id: string;
    integration: 'dosespot' | 'paytheory' | 'shipstation' | 'zoom' | 'choosehealth' | 'activecampaign';
    enabled: boolean;
    config: Record<string, unknown>; // Integration-specific fields
    secrets: Record<string, never>;  // Always empty object in responses
    validation: {
      status: 'valid' | 'invalid' | 'pending' | 'unconfigured';
      message?: string;
      validatedAt?: string;
    };
    updatedAt: string;
    updatedBy: string;
  }

  // mocks/integrations.json
  [
    {
      "id": "int_001",
      "integration": "dosespot",
      "enabled": true,
      "config": {
        "clinicId": "12345",
        "clinicName": "Acme Health Clinic",
        "environment": "production",
        "epcsEnabled": true
      },
      "secrets": {},
      "validation": {
        "status": "valid",
        "message": "Connected to DoseSpot API successfully",
        "validatedAt": "2025-12-03T10:45:00Z"
      },
      "updatedAt": "2025-12-01T14:30:00Z",
      "updatedBy": "admin@acme.com"
    },
    {
      "id": "int_002",
      "integration": "paytheory",
      "enabled": true,
      "config": {
        "merchantId": "mrc_acme_12345",
        "environment": "production",
        "webhookUrl": "https://api.teligant.com/webhooks/paytheory"
      },
      "secrets": {},
      "validation": {
        "status": "invalid",
        "message": "401 Unauthorized: Invalid API key or merchant ID",
        "validatedAt": "2025-12-03T12:30:00Z"
      },
      "updatedAt": "2025-11-15T09:00:00Z",
      "updatedBy": "admin@acme.com"
    }
  ]

  ---
  Component Patterns

  Validation Status Badge

  // Reusable badge component showing credential status
  <ValidationBadge status="valid" />    // 🟢 green
  <ValidationBadge status="invalid" />  // 🔴 red  
  <ValidationBadge status="pending" />  // 🟡 yellow spinner
  <ValidationBadge status="unconfigured" /> // ⚪ gray

  Credential Input Field

  // Write-only password field with metadata
  <CredentialField
    label="API Secret Key"
    configured={true}
    lastUpdated="2025-12-01"
    lastUpdatedBy="admin@acme.com"
    placeholder="Enter new value to update"
  />

  Integration Card (List View)

  <IntegrationCard
    name="DoseSpot"
    description="E-Prescribing"
    icon={<PillIcon />}
    enabled={true}
    validationStatus="valid"
    lastValidated="2 hours ago"
    onManage={() => navigate('/settings/integrations/dosespot')}
  />

  ---
  File Structure

  src/
  ├── components/
  │   ├── ui/                    # ShadcnUI components
  │   ├── integrations/
  │   │   ├── IntegrationCard.tsx
  │   │   ├── IntegrationForm.tsx
  │   │   ├── ValidationBadge.tsx
  │   │   ├── CredentialField.tsx
  │   │   └── ValidationBanner.tsx
  │   └── layout/
  │       ├── Sidebar.tsx
  │       └── Header.tsx
  ├── routes/
  │   ├── settings/
  │   │   └── integrations/
  │   │       ├── index.tsx      # List view
  │   │       └── $integration.tsx # Detail view
  ├── mocks/
  │   ├── integrations.json
  │   └── integration-schemas.json  # Field definitions per integration
  ├── types/
  │   └── integration.ts
  └── lib/
      └── mock-api.ts            # Simulated API calls with delays

  ---
  Design Guidelines

  From Production Teligant Platform

  - Clean, medical/professional aesthetic
  - High contrast for accessibility (healthcare compliance)
  - Clear status indicators (colorblind-friendly with icons + text)
  - Generous whitespace
  - Form validation with helpful error messages

  ShadcnUI Components to Use

  - Card - Integration cards and detail panels
  - Badge - Status indicators
  - Input - Form fields (type="password" for credentials)
  - Switch - Enable/disable toggles
  - Select - Dropdowns (environment, etc.)
  - Button - Actions
  - Alert - Validation status banners
  - Separator - Section dividers
  - Skeleton - Loading states

  ---
  Success Criteria

  The prototype is complete when:

  1. Integration list view shows all 6 integrations with status badges
  2. Detail view works for at least 4 integrations (DoseSpot, PayTheory, ShipStation, Zoom)
  3. All 4 validation states are demonstrated (valid, invalid, pending, unconfigured)
  4. "Test Connection" button triggers mock validation with loading state
  5. Form saves trigger success toast (mock, no real API)
  6. Responsive layout works on desktop (mobile not required for demo)
  7. Code is clean enough for developer to reference patterns

  ---
  Out of Scope

  - Real API integration (mock data only)
  - Authentication/authorization logic (Clerk for layout only)
  - Mobile responsive design
  - Backend encryption implementation
  - Other settings pages (only integrations)
