import { Composer } from './components/Composer'
import { NotificationList } from './components/NotificationList'
import { ToastStack } from './components/ToastStack'
import { useNotifications } from './hooks/useNotifications'
import type { NotificationFilter } from './types'
import './App.css'

const filters: { id: NotificationFilter; label: string }[] = [
  { id: 'all', label: 'Inbox' },
  { id: 'unread', label: 'Unread' },
  { id: 'archived', label: 'Archived' },
]

export default function App() {
  const {
    visible,
    filter,
    setFilter,
    toasts,
    unreadCount,
    addNotification,
    markRead,
    markAllRead,
    archive,
    restore,
    dismissToast,
    resetDemo,
  } = useNotifications()

  return (
    <div className="app-shell">
      <div className="atmosphere" aria-hidden />

      <header className="hero">
        <p className="brand">Herald</p>
        <h1>Notifications that stay out of the way until they matter.</h1>
        <p className="lede">
          A live inbox with unread counts, archive, and toast delivery for demo events.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#inbox">
            Open inbox
          </a>
          <a className="btn btn--secondary" href="#composer">
            Send a demo
          </a>
        </div>
      </header>

      <main>
        <section id="inbox" className="inbox" aria-labelledby="inbox-heading">
          <div className="inbox__header">
            <div>
              <h2 id="inbox-heading">
                Inbox
                {unreadCount > 0 ? (
                  <span className="badge" aria-label={`${unreadCount} unread`}>
                    {unreadCount}
                  </span>
                ) : null}
              </h2>
              <p>Filter, mark read, and archive without leaving the page.</p>
            </div>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </button>
          </div>

          <div className="filter-bar" role="tablist" aria-label="Notification filters">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={`filter-chip${filter === item.id ? ' is-active' : ''}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <NotificationList
            items={visible}
            filter={filter}
            onMarkRead={markRead}
            onArchive={archive}
            onRestore={restore}
          />
        </section>

        <div id="composer">
          <Composer onSend={addNotification} onReset={resetDemo} />
        </div>
      </main>

      <ToastStack toasts={toasts} onDismiss={dismissToast} onOpen={markRead} />
    </div>
  )
}
