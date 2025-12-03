import { Plug2 } from 'lucide-react'
import type { ValidationStatus } from './integration-details'

export const integrations: {
  name: string
  slug: string
  logo: React.ReactNode
  connected: boolean
  status: ValidationStatus
  desc: string
}[] = [
  {
    name: 'PayTheory',
    slug: 'paytheory',
    logo: <Plug2 />,
    connected: true,
    status: 'invalid',
    desc: 'Payment processing for healthcare transactions.',
  },
  {
    name: 'DoseSpot',
    slug: 'dosespot',
    logo: <Plug2 />,
    connected: true,
    status: 'valid',
    desc: 'E-prescribing and medication management integration.',
  },
  {
    name: 'ShipStation',
    slug: 'shipstation',
    logo: <Plug2 />,
    connected: false,
    status: 'unconfigured',
    desc: 'Shipping and fulfillment for pharmacy orders.',
  },
  {
    name: 'Zoom',
    slug: 'zoom',
    logo: <Plug2 />,
    connected: true,
    status: 'pending',
    desc: 'Telemedicine video consultations platform.',
  },
  {
    name: 'ActiveCampaign',
    slug: 'activecampaign',
    logo: <Plug2 />,
    connected: false,
    status: 'unconfigured',
    desc: 'Marketing automation and email campaigns.',
  },
  {
    name: 'ChooseHealth',
    slug: 'choosehealth',
    logo: <Plug2 />,
    connected: true,
    status: 'valid',
    desc: 'Lab services and diagnostic testing integration.',
  },
  {
    name: 'SmartyStreets',
    slug: 'smartystreets',
    logo: <Plug2 />,
    connected: false,
    status: 'unconfigured',
    desc: 'Address verification and validation service.',
  },
  {
    name: 'Claude AI',
    slug: 'claude-ai',
    logo: <Plug2 />,
    connected: false,
    status: 'unconfigured',
    desc: 'AI-powered assistant for clinical support.',
  },
  {
    name: 'Slack',
    slug: 'slack',
    logo: <Plug2 />,
    connected: false,
    status: 'unconfigured',
    desc: 'Team notifications and alerts via webhooks.',
  },
  {
    name: 'AWS',
    slug: 'aws',
    logo: <Plug2 />,
    connected: true,
    status: 'valid',
    desc: 'Cloud services for S3, SES, and Pinpoint.',
  },
]
