import { useState } from 'react'
import { Link, getRouteApi } from '@tanstack/react-router'
import { ArrowLeft, Loader2, Lock, RefreshCw, Webhook } from 'lucide-react'
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
import { toast } from 'sonner'
import { ValidationStatusBanner } from '../components/validation-status-banner'
import { CredentialField } from '../components/credential-field'
import { WebhookScenarios } from '../components/webhook-scenarios'
import { AddWebhookDialog } from '../components/add-webhook-dialog'
import { integrationDetails } from '../data/integration-details'

const route = getRouteApi('/_authenticated/integrations/$integration')

export function IntegrationDetail() {
  const { integration: integrationSlug } = route.useParams()
  const integration = integrationDetails[integrationSlug]
  const [showBanner, setShowBanner] = useState(true)
  const [isTesting, setIsTesting] = useState(false)

  // Simulate test connection
  const handleTestConnection = () => {
    setIsTesting(true)
    setShowBanner(true)
    // Simulate API call delay
    setTimeout(() => {
      setIsTesting(false)
      toast.success('Connection test completed', {
        description: integration?.validation.status === 'connected'
          ? 'Credentials are valid'
          : 'See status banner for details',
      })
    }, 2000)
  }

  // Derive UI state from integration data
  const isNotConnected = integration?.validation.status === 'not_connected'

  // Check if any credentials are configured
  const hasConfiguredCredentials = integration?.credentials.some(
    (cred) => cred.configured
  ) ?? false

  // Check if any config fields have values (non-empty strings for text fields)
  const hasConfigValues = integration?.config.some((field) => {
    if (field.type === 'text') {
      return typeof field.value === 'string' && field.value.trim() !== ''
    }
    return false // Select and checkbox always have default values
  }) ?? false

  // Check if any webhook scenarios have URLs configured
  const hasWebhookScenarios = integration?.webhookScenarios && integration.webhookScenarios.length > 0
  const hasConfiguredWebhooks = integration?.webhookScenarios?.some(
    (scenario) => scenario.webhookUrl.trim() !== ''
  ) ?? false

  // Can save if there's any data entered (config values, credentials, or webhooks)
  const hasDataToSave = hasConfigValues || hasConfiguredCredentials || hasConfiguredWebhooks

  // Can delete only if something has been configured
  const canDelete = hasConfiguredCredentials || hasConfiguredWebhooks

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
          <Button
            variant='outline'
            onClick={handleTestConnection}
            disabled={isTesting || isNotConnected}
          >
            {isTesting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <RefreshCw className='mr-2 h-4 w-4' />
            )}
            {isTesting ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>

        {/* Validation Status Banner */}
        {showBanner && (
          isTesting ? (
            <div className='flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950'>
              <Loader2 className='h-5 w-5 animate-spin text-blue-600 dark:text-blue-400' />
              <div>
                <p className='font-medium text-blue-900 dark:text-blue-100'>Validating credentials...</p>
                <p className='text-sm text-blue-700 dark:text-blue-300'>
                  Testing connection to {integration.name} API
                </p>
              </div>
            </div>
          ) : (
            <ValidationStatusBanner
              status={integration.validation.status}
              message={integration.validation.message}
              validatedAt={integration.validation.validatedAt}
              onClose={() => setShowBanner(false)}
            />
          )
        )}

        {/* Status Toggle */}
        <div className='mt-6 flex items-center gap-4'>
          <Label htmlFor='status' className='text-sm font-medium'>
            Status
          </Label>
          <div className='flex items-center gap-2'>
            <Switch
              id='status'
              defaultChecked={integration.enabled}
              disabled={isNotConnected}
            />
            <span className='text-muted-foreground text-sm'>
              {isNotConnected
                ? 'Configure credentials to enable'
                : integration.enabled
                  ? 'Enabled'
                  : 'Disabled'}
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
                <div className='space-y-1'>
                  <Input
                    id={field.key}
                    defaultValue={field.value as string}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className={field.error ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {field.error && (
                    <p className='text-sm text-red-500'>{field.error}</p>
                  )}
                </div>
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

        {/* Webhook Scenarios Section (Slack-specific) */}
        {hasWebhookScenarios && (
          <>
            <Separator className='my-6' />
            <div className='flex items-start justify-between gap-4'>
              <div className='space-y-1'>
                <h3 className='flex items-center gap-2 text-lg font-medium'>
                  <Webhook className='h-4 w-4' />
                  Webhook Scenarios
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Configure webhook URLs for each alert type. Each scenario can post to a different Slack channel.
                </p>
              </div>
              <AddWebhookDialog />
            </div>
            <Separator className='my-4' />
            <div className='lg:max-w-2xl'>
              <WebhookScenarios scenarios={integration.webhookScenarios!} />
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className='mt-8 flex justify-between'>
          {canDelete ? (
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
          ) : (
            <div /> // Empty placeholder to maintain flex justify-between layout
          )}

          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link to='/integrations'>Cancel</Link>
            </Button>
            <Button
              disabled={!hasDataToSave}
              onClick={() => {
                toast.success('Changes saved', {
                  description: `${integration.name} integration settings have been updated.`,
                })
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Main>
    </>
  )
}
