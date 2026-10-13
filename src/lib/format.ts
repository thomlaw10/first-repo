import type { NotificationKind } from '../types'

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60_000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`

  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function kindLabel(kind: NotificationKind): string {
  switch (kind) {
    case 'system':
      return 'System'
    case 'activity':
      return 'Activity'
    case 'mention':
      return 'Mention'
    case 'alert':
      return 'Alert'
  }
}
