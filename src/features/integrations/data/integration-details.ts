export type ValidationStatus = 'valid' | 'invalid' | 'pending' | 'unconfigured'

export interface IntegrationCredential {
  key: string
  label: string
  configured: boolean
  lastUpdated?: string
  lastUpdatedBy?: string
}

export interface IntegrationConfig {
  key: string
  label: string
  type: 'text' | 'select' | 'checkbox'
  value: string | boolean
  options?: { label: string; value: string }[]
  description?: string
}

export interface IntegrationDetail {
  id: string
  name: string
  slug: string
  description: string
  enabled: boolean
  config: IntegrationConfig[]
  credentials: IntegrationCredential[]
  validation: {
    status: ValidationStatus
    message?: string
    validatedAt?: string
  }
  updatedAt: string
  updatedBy: string
}

export const integrationDetails: Record<string, IntegrationDetail> = {
  dosespot: {
    id: 'int_001',
    name: 'DoseSpot',
    slug: 'dosespot',
    description: 'E-prescribing and medication management integration.',
    enabled: true,
    config: [
      {
        key: 'clinicId',
        label: 'Clinic ID',
        type: 'text',
        value: '12345',
      },
      {
        key: 'clinicName',
        label: 'Clinic Name',
        type: 'text',
        value: 'Acme Health Clinic',
      },
      {
        key: 'environment',
        label: 'Environment',
        type: 'select',
        value: 'production',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
        ],
      },
      {
        key: 'epcsEnabled',
        label: 'EPCS Enabled',
        type: 'checkbox',
        value: true,
        description: 'Allow controlled substances prescribing',
      },
    ],
    credentials: [
      {
        key: 'clinicKey',
        label: 'Clinic Key',
        configured: true,
        lastUpdated: '2025-12-01T14:30:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
      {
        key: 'clinicSecret',
        label: 'Clinic Secret',
        configured: true,
        lastUpdated: '2025-12-01T14:30:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
    ],
    validation: {
      status: 'valid',
      message: 'Connected to DoseSpot API successfully',
      validatedAt: '2025-12-03T10:45:00Z',
    },
    updatedAt: '2025-12-01T14:30:00Z',
    updatedBy: 'admin@acme.com',
  },
  paytheory: {
    id: 'int_002',
    name: 'PayTheory',
    slug: 'paytheory',
    description: 'Payment processing for healthcare transactions.',
    enabled: true,
    config: [
      {
        key: 'merchantId',
        label: 'Merchant ID',
        type: 'text',
        value: 'mrc_acme_12345',
      },
      {
        key: 'environment',
        label: 'Environment',
        type: 'select',
        value: 'production',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
        ],
      },
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        type: 'text',
        value: 'https://api.teligant.com/webhooks/paytheory',
      },
    ],
    credentials: [
      {
        key: 'apiKey',
        label: 'API Key',
        configured: true,
        lastUpdated: '2025-11-15T09:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
      {
        key: 'apiSecret',
        label: 'API Secret',
        configured: true,
        lastUpdated: '2025-11-15T09:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
    ],
    validation: {
      status: 'invalid',
      message: '401 Unauthorized: Invalid API key or merchant ID',
      validatedAt: '2025-12-03T12:30:00Z',
    },
    updatedAt: '2025-11-15T09:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  shipstation: {
    id: 'int_003',
    name: 'ShipStation',
    slug: 'shipstation',
    description: 'Shipping and fulfillment for pharmacy orders.',
    enabled: false,
    config: [
      {
        key: 'storeId',
        label: 'Store ID',
        type: 'text',
        value: '',
      },
      {
        key: 'environment',
        label: 'Environment',
        type: 'select',
        value: 'staging',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
        ],
      },
    ],
    credentials: [
      {
        key: 'apiKey',
        label: 'API Key',
        configured: false,
      },
      {
        key: 'apiSecret',
        label: 'API Secret',
        configured: false,
      },
    ],
    validation: {
      status: 'unconfigured',
      message: 'Integration has not been configured yet',
    },
    updatedAt: '2025-11-01T08:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  zoom: {
    id: 'int_004',
    name: 'Zoom',
    slug: 'zoom',
    description: 'Telemedicine video consultations platform.',
    enabled: true,
    config: [
      {
        key: 'accountId',
        label: 'Account ID',
        type: 'text',
        value: 'acme_zoom_001',
      },
      {
        key: 'environment',
        label: 'Environment',
        type: 'select',
        value: 'production',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
        ],
      },
      {
        key: 'autoRecording',
        label: 'Auto Recording',
        type: 'checkbox',
        value: true,
        description: 'Automatically record all consultations',
      },
    ],
    credentials: [
      {
        key: 'clientId',
        label: 'Client ID',
        configured: true,
        lastUpdated: '2025-11-20T16:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
      {
        key: 'clientSecret',
        label: 'Client Secret',
        configured: true,
        lastUpdated: '2025-11-20T16:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
    ],
    validation: {
      status: 'pending',
      message: 'Validating credentials...',
      validatedAt: '2025-12-03T14:00:00Z',
    },
    updatedAt: '2025-11-20T16:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  activecampaign: {
    id: 'int_005',
    name: 'ActiveCampaign',
    slug: 'activecampaign',
    description: 'Marketing automation and email campaigns.',
    enabled: false,
    config: [
      {
        key: 'accountName',
        label: 'Account Name',
        type: 'text',
        value: '',
      },
      {
        key: 'listId',
        label: 'Default List ID',
        type: 'text',
        value: '',
      },
    ],
    credentials: [
      {
        key: 'apiKey',
        label: 'API Key',
        configured: false,
      },
      {
        key: 'apiUrl',
        label: 'API URL',
        configured: false,
      },
    ],
    validation: {
      status: 'unconfigured',
    },
    updatedAt: '2025-10-15T10:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  choosehealth: {
    id: 'int_006',
    name: 'ChooseHealth',
    slug: 'choosehealth',
    description: 'Lab services and diagnostic testing integration.',
    enabled: true,
    config: [
      {
        key: 'partnerId',
        label: 'Partner ID',
        type: 'text',
        value: 'acme_partner_001',
      },
      {
        key: 'environment',
        label: 'Environment',
        type: 'select',
        value: 'production',
        options: [
          { label: 'Production', value: 'production' },
          { label: 'Staging', value: 'staging' },
        ],
      },
    ],
    credentials: [
      {
        key: 'apiKey',
        label: 'API Key',
        configured: true,
        lastUpdated: '2025-11-25T11:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
    ],
    validation: {
      status: 'valid',
      message: 'Connected to ChooseHealth API successfully',
      validatedAt: '2025-12-02T09:00:00Z',
    },
    updatedAt: '2025-11-25T11:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  smartystreets: {
    id: 'int_007',
    name: 'SmartyStreets',
    slug: 'smartystreets',
    description: 'Address verification and validation service.',
    enabled: false,
    config: [
      {
        key: 'licenseType',
        label: 'License Type',
        type: 'select',
        value: 'us-street',
        options: [
          { label: 'US Street', value: 'us-street' },
          { label: 'International', value: 'international' },
        ],
      },
    ],
    credentials: [
      {
        key: 'authId',
        label: 'Auth ID',
        configured: false,
      },
      {
        key: 'authToken',
        label: 'Auth Token',
        configured: false,
      },
    ],
    validation: {
      status: 'unconfigured',
    },
    updatedAt: '2025-10-01T08:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  'claude-ai': {
    id: 'int_008',
    name: 'Claude AI',
    slug: 'claude-ai',
    description: 'AI-powered assistant for clinical support.',
    enabled: false,
    config: [
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        value: 'claude-3-sonnet',
        options: [
          { label: 'Claude 3 Opus', value: 'claude-3-opus' },
          { label: 'Claude 3 Sonnet', value: 'claude-3-sonnet' },
          { label: 'Claude 3 Haiku', value: 'claude-3-haiku' },
        ],
      },
      {
        key: 'maxTokens',
        label: 'Max Tokens',
        type: 'text',
        value: '4096',
      },
    ],
    credentials: [
      {
        key: 'apiKey',
        label: 'API Key',
        configured: false,
      },
    ],
    validation: {
      status: 'unconfigured',
    },
    updatedAt: '2025-10-01T08:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  slack: {
    id: 'int_009',
    name: 'Slack',
    slug: 'slack',
    description: 'Team notifications and alerts via webhooks.',
    enabled: false,
    config: [
      {
        key: 'defaultChannel',
        label: 'Default Channel',
        type: 'text',
        value: '#alerts',
      },
    ],
    credentials: [
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        configured: false,
      },
    ],
    validation: {
      status: 'unconfigured',
    },
    updatedAt: '2025-10-01T08:00:00Z',
    updatedBy: 'admin@acme.com',
  },
  aws: {
    id: 'int_010',
    name: 'AWS',
    slug: 'aws',
    description: 'Cloud services for S3, SES, and Pinpoint.',
    enabled: true,
    config: [
      {
        key: 'region',
        label: 'Region',
        type: 'select',
        value: 'us-east-1',
        options: [
          { label: 'US East (N. Virginia)', value: 'us-east-1' },
          { label: 'US West (Oregon)', value: 'us-west-2' },
          { label: 'EU (Ireland)', value: 'eu-west-1' },
        ],
      },
      {
        key: 's3Bucket',
        label: 'S3 Bucket',
        type: 'text',
        value: 'acme-health-files',
      },
      {
        key: 'sesEnabled',
        label: 'SES Email',
        type: 'checkbox',
        value: true,
        description: 'Enable email sending via SES',
      },
      {
        key: 'pinpointEnabled',
        label: 'Pinpoint SMS',
        type: 'checkbox',
        value: true,
        description: 'Enable SMS notifications via Pinpoint',
      },
    ],
    credentials: [
      {
        key: 'accessKeyId',
        label: 'Access Key ID',
        configured: true,
        lastUpdated: '2025-11-10T12:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
      {
        key: 'secretAccessKey',
        label: 'Secret Access Key',
        configured: true,
        lastUpdated: '2025-11-10T12:00:00Z',
        lastUpdatedBy: 'admin@acme.com',
      },
    ],
    validation: {
      status: 'valid',
      message: 'Connected to AWS services successfully',
      validatedAt: '2025-12-03T08:00:00Z',
    },
    updatedAt: '2025-11-10T12:00:00Z',
    updatedBy: 'admin@acme.com',
  },
}
