import { useEffect, useState } from 'react'
import { seedNotifications } from '../data/seed'
import type { Notification, NotificationDraft, NotificationFilter } from '../types'

const STORAGE_KEY = 'herald.notifications.v1'

function loadNotifications(): Notification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedNotifications
    const parsed = JSON.parse(raw) as Notification[]
    if (!Array.isArray(parsed) || parsed.length === 0) return seedNotifications
    return parsed
  } catch {
    return seedNotifications
  }
}

function createId() {
  return `n-${crypto.randomUUID().slice(0, 8)}`
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(loadNotifications)
  const [filter, setFilter] = useState<NotificationFilter>('all')
  const [toasts, setToasts] = useState<Notification[]>([])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const visible = notifications.filter((item) => {
    if (filter === 'unread') return !item.read && !item.archived
    if (filter === 'archived') return item.archived
    return !item.archived
  })

  const unreadCount = notifications.filter((item) => !item.read && !item.archived).length

  function addNotification(draft: NotificationDraft, showToast = true) {
    const next: Notification = {
      id: createId(),
      kind: draft.kind,
      title: draft.title,
      body: draft.body,
      createdAt: new Date().toISOString(),
      read: false,
      archived: false,
    }

    setNotifications((prev) => [next, ...prev])

    if (showToast) {
      setToasts((prev) => [next, ...prev].slice(0, 3))
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== next.id))
      }, 4200)
    }
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }

  function markAllRead() {
    setNotifications((prev) =>
      prev.map((item) => (item.archived ? item : { ...item, read: true })),
    )
  }

  function archive(id: string) {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, archived: true, read: true } : item,
      ),
    )
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  function restore(id: string) {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, archived: false } : item)),
    )
  }

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  function resetDemo() {
    localStorage.removeItem(STORAGE_KEY)
    setNotifications(seedNotifications)
    setToasts([])
    setFilter('all')
  }

  return {
    notifications,
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
  }
}
