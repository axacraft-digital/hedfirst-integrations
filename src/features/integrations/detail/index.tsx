import { useState } from 'react'
import { Link, getRouteApi } from '@tanstack/react-router'
import { ArrowLeft, Lock, RefreshCw } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ValidationStatusBanner } from '../components/validation-status-banner'
import { CredentialField } from '../components/credential-field'
import { integrationDetails } from '../data/integration-details'

const route = getRouteApi('/_authenticated/integrations/$integration')

export function IntegrationDetail() {
  const { integration: integrationSlug } = route.useParams()
  const integration = integrationDetails[integrationSlug]
  const [showInvalidBanner, setShowInvalidBanner] = useState(true)
  const [showValidBanner, setShowValidBanner] = useState(true)

  if (!integration) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex flex-col items-center justify-center py-12'>
            <h2 className='text-2xl font-bold'>Integration not found</h2>
            <p className='text-muted-foreground mt-2'>
              The integration "{integrationSlug}" does not exist.
            </p>
            <Button asChild className='mt-4'>
              <Link to='/integrations'>Back to Integrations</Link>
            </Button>
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='pb-16'>
        {/* Back Button */}
        <div className='mb-4'>
          <Button variant='ghost' size='sm' asChild>
            <Link to='/integrations'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back
            </Link>
          </Button>
        </div>

        {/* Page Title */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {integration.name}
          </h1>
          <p className='text-muted-foreground'>{integration.description}</p>
        </div>

        {/* Test Connection */}
        <div className='mb-4'>
          <Button variant='outline'>
            <RefreshCw className='mr-2 h-4 w-4' />
            Test Connection
          </Button>
        </div>

        {/* Validation Status Banners - showing both states for developer reference */}
        <div className='flex flex-col gap-3'>
          {showInvalidBanner && (
            <ValidationStatusBanner
              status='invalid'
              message='401 Unauthorized: Invalid API key or merchant ID'
              validatedAt='2025-12-03T12:30:00Z'
              onClose={() => setShowInvalidBanner(false)}
            />
          )}
          {showValidBanner && (
            <ValidationStatusBanner
              status='valid'
              message='Connected to API successfully'
              validatedAt='2025-12-03T10:45:00Z'
              onClose={() => setShowValidBanner(false)}
            />
          )}
        </div>

        {/* Status Toggle */}
        <div className='mt-6 flex items-center gap-4'>
          <Label htmlFor='status' className='text-sm font-medium'>
            Status
          </Label>
          <div className='flex items-center gap-2'>
            <Switch id='status' defaultChecked={integration.enabled} />
            <span className='text-muted-foreground text-sm'>
              {integration.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <Separator className='my-6' />

        {/* General Settings Section */}
        <div className='space-y-1'>
          <h3 className='text-lg font-medium'>General Settings</h3>
          <p className='text-muted-foreground text-sm'>
            Configure the basic settings for this integration.
          </p>
        </div>
        <Separator className='my-4' />

        <div className='grid gap-4 lg:max-w-xl'>
          {integration.config.map((field) => (
            <div key={field.key} className='grid gap-2'>
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === 'text' && (
                <Input
                  id={field.key}
                  defaultValue={field.value as string}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
              {field.type === 'select' && (
                <Select defaultValue={field.value as string}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === 'checkbox' && (
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id={field.key}
                    defaultChecked={field.value as boolean}
                  />
                  <label
                    htmlFor={field.key}
                    className='text-muted-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {field.description}
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className='my-6' />

        {/* Credentials Section */}
        <div className='space-y-1'>
          <h3 className='flex items-center gap-2 text-lg font-medium'>
            <Lock className='h-4 w-4' />
            Credentials
          </h3>
          <p className='text-muted-foreground text-sm'>
            Secure credentials for API authentication. Leave blank to keep
            existing values.
          </p>
        </div>
        <Separator className='my-4' />

        <div className='grid gap-4 lg:max-w-xl'>
          {integration.credentials.map((credential) => (
            <CredentialField
              key={credential.key}
              label={credential.label}
              configured={credential.configured}
              lastUpdated={credential.lastUpdated}
              lastUpdatedBy={credential.lastUpdatedBy}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className='mt-8 flex justify-between'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>Remove Integration</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove {integration.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the {integration.name} integration
                  and delete all associated credentials. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-destructive text-white hover:bg-destructive/90'>
                  Remove Integration
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link to='/integrations'>Cancel</Link>
            </Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Main>
    </>
  )
}
