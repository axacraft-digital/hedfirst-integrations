import {
  LayoutDashboard,
  HelpCircle,
  Package,
  Settings,
  Users,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Truck,
  Bot,
  Pill,
  Building2,
  Tag,
  Mail,
  ShoppingCart,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'kellys',
    email: 'kellysmith@kellysmith.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Hedfirst',
      logo: Command,
      plan: '',
    },
    {
      name: 'Teligant',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Messages',
          url: '/chats',
          icon: Mail,
        },
        {
          title: 'Products',
          url: '/help-center',
          icon: Package,
        },
        {
          title: 'Orders & Services',
          icon: ShoppingCart,
          items: [
            {
              title: 'All Orders',
              url: '/orders',
            },
            {
              title: 'Consultations',
              url: '/orders/consultations',
            },
            {
              title: 'Subscriptions',
              url: '/orders/subscriptions',
            },
            {
              title: 'One-time Purchases',
              url: '/orders/one-time',
            },
          ],
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
      ],
    },
    {
      title: 'Administration',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Shipping Rules',
              url: '/settings',
              icon: Truck,
            },
            {
              title: 'Hedfirst AI',
              url: '/settings/hedfirst-ai',
              icon: Bot,
            },
            {
              title: 'Integrations',
              url: '/integrations',
              icon: Pill,
            },
            {
              title: 'Pharmacies',
              url: '/settings/pharmacies',
              icon: Building2,
            },
            {
              title: 'Discount Codes',
              url: '/settings/discount-codes',
              icon: Tag,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Template Pages',
          icon: ShieldCheck,
          items: [
            {
              title: 'Dashboard',
              url: '/',
            },
            {
              title: 'Tasks',
              url: '/tasks',
            },
            {
              title: 'Apps',
              url: '/apps',
            },
            {
              title: 'Chats',
              url: '/chats',
            },
            {
              title: 'Users',
              url: '/users',
            },
            {
              title: 'Coming Soon',
              url: '/help-center',
            },
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
            {
              title: 'Settings - Profile',
              url: '/settings',
            },
            {
              title: 'Settings - Account',
              url: '/settings/account',
            },
            {
              title: 'Settings - Appearance',
              url: '/settings/appearance',
            },
            {
              title: 'Settings - Notifications',
              url: '/settings/notifications',
            },
            {
              title: 'Settings - Display',
              url: '/settings/display',
            },
            {
              title: '401 Unauthorized',
              url: '/errors/unauthorized',
            },
            {
              title: '403 Forbidden',
              url: '/errors/forbidden',
            },
            {
              title: '404 Not Found',
              url: '/errors/not-found',
            },
            {
              title: '500 Server Error',
              url: '/errors/internal-server-error',
            },
            {
              title: '503 Maintenance',
              url: '/errors/maintenance-error',
            },
          ],
        },
      ],
    },
  ],
}
