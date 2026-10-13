import type { Notification } from '../types'

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString()

export const seedNotifications: Notification[] = [
  {
    id: 'n-1',
    kind: 'mention',
    title: 'Maya tagged you in Sprint planning',
    body: 'Can you take the notifications API slice for tomorrow’s demo?',
    createdAt: minutesAgo(12),
    read: false,
    archived: false,
  },
  {
    id: 'n-2',
    kind: 'alert',
    title: 'Deploy pipeline paused',
    body: 'Staging build failed on lint. Review the latest commit before retrying.',
    createdAt: minutesAgo(38),
    read: false,
    archived: false,
  },
  {
    id: 'n-3',
    kind: 'activity',
    title: 'Design review completed',
    body: 'Alex approved the inbox empty state and toast motion specs.',
    createdAt: minutesAgo(95),
    read: true,
    archived: false,
  },
  {
    id: 'n-4',
    kind: 'system',
    title: 'Quiet hours end at 8:00 AM',
    body: 'Herald will deliver deferred alerts when quiet hours lift.',
    createdAt: minutesAgo(220),
    read: true,
    archived: false,
  },
  {
    id: 'n-5',
    kind: 'activity',
    title: 'Weekly digest ready',
    body: '14 unread mentions and 3 alerts from the past seven days.',
    createdAt: minutesAgo(860),
    read: true,
    archived: true,
  },
]

export const sampleDrafts = [
  {
    kind: 'alert' as const,
    title: 'Payment retry succeeded',
    body: 'Invoice #4821 cleared after the second attempt.',
  },
  {
    kind: 'mention' as const,
    title: 'Jordan mentioned you',
    body: 'Please confirm the rollout window for Herald toasts.',
  },
  {
    kind: 'activity' as const,
    title: 'New comment on Inbox filters',
    body: 'Priya left feedback on the archived tab copy.',
  },
  {
    kind: 'system' as const,
    title: 'Preferences synced',
    body: 'Your notification settings were updated across devices.',
  },
]
