import type { Notification, NotificationFilter } from '../types'
import { NotificationItem } from './NotificationItem'

interface NotificationListProps {
  items: Notification[]
  filter: NotificationFilter
  onMarkRead: (id: string) => void
  onArchive: (id: string) => void
  onRestore: (id: string) => void
}

const emptyCopy: Record<NotificationFilter, { title: string; body: string }> = {
  all: {
    title: 'Inbox is clear',
    body: 'New alerts, mentions, and activity will land here.',
  },
  unread: {
    title: 'Nothing unread',
    body: 'You’re caught up. Fire a demo alert to see the unread state.',
  },
  archived: {
    title: 'No archived items',
    body: 'Archive a notification to keep the inbox focused.',
  },
}

export function NotificationList({
  items,
  filter,
  onMarkRead,
  onArchive,
  onRestore,
}: NotificationListProps) {
  if (items.length === 0) {
    const copy = emptyCopy[filter]
    return (
      <div className="empty-state" role="status">
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
      </div>
    )
  }

  return (
    <div className="notification-list" role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <NotificationItem
            notification={item}
            onMarkRead={onMarkRead}
            onArchive={onArchive}
            onRestore={onRestore}
          />
        </div>
      ))}
    </div>
  )
}
