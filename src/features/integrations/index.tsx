import { Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { IntegrationsPrimaryButtons } from './components/integrations-primary-buttons'
import { integrations } from './data/integrations'

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
          {integrations.map((integration) => (
            <li key={integration.name}>
              <Link
                to='/integrations/$integration'
                params={{ integration: integration.slug }}
                className='block rounded-lg border p-4 hover:shadow-md'
              >
                <div className='mb-8 flex items-center justify-between'>
                  <div className='bg-muted flex size-10 items-center justify-center rounded-lg p-2'>
                    {integration.logo}
                  </div>
                  <span
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-8 px-3 border ${
                      integration.connected
                        ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950'
                        : 'bg-background shadow-xs dark:bg-input/30 dark:border-input'
                    }`}
                  >
                    {integration.connected ? 'Connected' : 'Connect'}
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
          ))}
        </ul>
      </Main>
    </>
  )
}
