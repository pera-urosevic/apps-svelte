export const alertError = (error: string) => {
  alert(error)
  return null
}

export const alertServerError = async (res: Response) => {
  try {
    const { error } = await res.json()
    alert(`${res.status}: ${error ?? res.statusText}`)
  } catch (e) {
    alert(`${res.status}: ${res.statusText}`)
  } finally {
    return null
  }
}
