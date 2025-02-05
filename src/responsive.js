const setResponsiveClass = () => {
  const mql = window.matchMedia('(max-width: 400px)')
  if (mql.matches) {
    document.body.classList.remove('desktop')
    document.body.classList.add('mobile')
  } else {
    document.body.classList.remove('mobile')
    document.body.classList.add('desktop')
  }
}

window.addEventListener('load', setResponsiveClass)
window.addEventListener('resize', setResponsiveClass)
