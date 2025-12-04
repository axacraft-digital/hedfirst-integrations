import { Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { IntegrationsPrimaryButtons } from './components/integrations-primary-buttons'
import { integrations } from './data/integrations'
import type { ValidationStatus } from './data/integration-details'

const statusBadgeConfig: Record<
  ValidationStatus,
  { label: string; className: string }
> = {
  connected: {
    label: 'Connected',
    className: 'border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-400',
  },
  issue: {
    label: 'Issue',
    className: 'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-400',
  },
  not_tested: {
    label: 'Not Tested',
    className: 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400',
  },
  not_connected: {
    label: 'Not Connected',
    className: 'bg-background shadow-xs dark:bg-input/30 dark:border-input',
  },
}

export function Integrations() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Integrations</h2>
            <p className='text-muted-foreground'>
              Manage your third-party integrations here.
            </p>
          </div>
          <IntegrationsPrimaryButtons />
        </div>
        <Separator className='my-4 shadow-sm' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {integrations.map((integration) => {
            const badge = statusBadgeConfig[integration.status]
            return (
              <li key={integration.name}>
                <Link
                  to='/integrations/$integration'
                  params={{ integration: integration.slug }}
                  className='block h-full rounded-lg border p-4 hover:shadow-md'
                >
                  <div className='mb-8 flex items-center justify-between'>
                    <div className='bg-muted flex size-10 items-center justify-center rounded-lg p-2'>
                      {integration.logo}
                    </div>
                    <span
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-8 px-3 border ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div>
                    <h2 className='mb-1 font-semibold'>{integration.name}</h2>
                    <p className='line-clamp-2 text-gray-500'>
                      {integration.desc}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Main>
    </>
  )
}
