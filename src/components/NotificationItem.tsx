import type { Notification } from '../types'
import { formatRelativeTime, kindLabel } from '../lib/format'

interface NotificationItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
  onArchive: (id: string) => void
  onRestore: (id: string) => void
}

export function NotificationItem({
  notification,
  onMarkRead,
  onArchive,
  onRestore,
}: NotificationItemProps) {
  const { id, kind, title, body, createdAt, read, archived } = notification

  return (
    <article
      className={`notification-item${read ? '' : ' is-unread'}${archived ? ' is-archived' : ''}`}
    >
      <div className={`notification-item__rail notification-item__rail--${kind}`} aria-hidden />
      <div className="notification-item__body">
        <div className="notification-item__meta">
          <span className={`kind-chip kind-chip--${kind}`}>{kindLabel(kind)}</span>
          <time dateTime={createdAt}>{formatRelativeTime(createdAt)}</time>
          {!read && !archived ? <span className="unread-dot" aria-label="Unread" /> : null}
        </div>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="notification-item__actions">
          {!archived && !read ? (
            <button type="button" className="btn btn--ghost" onClick={() => onMarkRead(id)}>
              Mark read
            </button>
          ) : null}
          {archived ? (
            <button type="button" className="btn btn--ghost" onClick={() => onRestore(id)}>
              Restore
            </button>
          ) : (
            <button type="button" className="btn btn--ghost" onClick={() => onArchive(id)}>
              Archive
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
