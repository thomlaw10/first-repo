import type { Notification } from '../types'
import { formatRelativeTime, kindLabel } from '../lib/format'

interface ToastStackProps {
  toasts: Notification[]
  onDismiss: (id: string) => void
  onOpen: (id: string) => void
}

export function ToastStack({ toasts, onDismiss, onOpen }: ToastStackProps) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-stack" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <article key={toast.id} className={`toast toast--${toast.kind}`} role="status">
          <div className="toast__meta">
            <span className="kind-chip">{kindLabel(toast.kind)}</span>
            <time dateTime={toast.createdAt}>{formatRelativeTime(toast.createdAt)}</time>
          </div>
          <h3>{toast.title}</h3>
          <p>{toast.body}</p>
          <div className="toast__actions">
            <button type="button" className="btn btn--ghost" onClick={() => onOpen(toast.id)}>
              Mark read
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss toast"
            >
              Dismiss
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
