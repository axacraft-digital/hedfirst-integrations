import { createFileRoute } from '@tanstack/react-router'
import { IntegrationDetail } from '@/features/integrations/detail'

export const Route = createFileRoute('/_authenticated/integrations/$integration')(
  {
    component: IntegrationDetail,
  }
)
