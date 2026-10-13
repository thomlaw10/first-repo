import { useState } from 'react'
import { sampleDrafts } from '../data/seed'
import type { NotificationDraft, NotificationKind } from '../types'

interface ComposerProps {
  onSend: (draft: NotificationDraft) => void
  onReset: () => void
}

const kinds: NotificationKind[] = ['system', 'activity', 'mention', 'alert']

export function Composer({ onSend, onReset }: ComposerProps) {
  const [kind, setKind] = useState<NotificationKind>('activity')
  const [title, setTitle] = useState('New notification')
  const [body, setBody] = useState('Write a short message for the inbox and toast.')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!title.trim() || !body.trim()) return
    onSend({ kind, title: title.trim(), body: body.trim() })
  }

  function loadSample() {
    const sample = sampleDrafts[Math.floor(Math.random() * sampleDrafts.length)]
    setKind(sample.kind)
    setTitle(sample.title)
    setBody(sample.body)
  }

  return (
    <section className="composer" aria-labelledby="composer-heading">
      <div className="composer__intro">
        <h2 id="composer-heading">Send a demo alert</h2>
        <p>Push an event into the inbox and watch the live toast stack.</p>
      </div>

      <form className="composer__form" onSubmit={handleSubmit}>
        <label>
          Kind
          <select value={kind} onChange={(event) => setKind(event.target.value as NotificationKind)}>
            {kinds.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={80}
            required
          />
        </label>

        <label>
          Message
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={180}
            rows={3}
            required
          />
        </label>

        <div className="composer__actions">
          <button type="submit" className="btn btn--primary">
            Send notification
          </button>
          <button type="button" className="btn btn--secondary" onClick={loadSample}>
            Load sample
          </button>
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Reset demo
          </button>
        </div>
      </form>
    </section>
  )
}
