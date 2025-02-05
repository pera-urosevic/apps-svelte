export const notificationColor = (channel: string, selected: boolean = true) => {
  if (!selected) return 'var(--color-muted)'
  if (channel === 'alert') return 'var(--color-error)'
  if (channel === 'warn') return 'var(--color-warning)'
  if (channel === 'info') return 'var(--color-success)'
  return ''
}
