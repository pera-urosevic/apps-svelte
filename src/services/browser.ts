export const isMobile = () => {
  const mediaQuery = window.matchMedia('(max-width: 600px)')
  return mediaQuery.matches
}
