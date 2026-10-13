export type NotificationKind = 'system' | 'activity' | 'mention' | 'alert'

export type NotificationFilter = 'all' | 'unread' | 'archived'

export interface Notification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  createdAt: string
  read: boolean
  archived: boolean
}

export interface NotificationDraft {
  kind: NotificationKind
  title: string
  body: string
}
