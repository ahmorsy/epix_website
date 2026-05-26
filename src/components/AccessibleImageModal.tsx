import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  imageSrc: string
  imageAlt: string
  closeLabel: string
  subtitle?: string
}

export function AccessibleImageModal({ open, onClose, title, imageSrc, imageAlt, closeLabel, subtitle }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open || !dialogRef.current) {
      return
    }

    const previousActive = document.activeElement as HTMLElement | null
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusables[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || focusables.length === 0) {
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousActive?.focus()
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b1933]/85 px-4 py-8" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#33538d] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--text)]">{title}</p>
            {subtitle ? <p className="text-sm text-[var(--text-muted)]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            className="rounded-lg border border-[var(--line)] px-3 py-1 text-sm font-semibold text-[var(--text-muted)]"
            onClick={onClose}
          >
            {closeLabel}
          </button>
        </div>
        <div className="max-h-[78vh] overflow-auto bg-[#eef4ff] p-3">
          <img src={imageSrc} alt={imageAlt} loading="eager" decoding="async" className="h-auto w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
