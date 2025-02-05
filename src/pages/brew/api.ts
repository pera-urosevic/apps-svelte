import { busy } from '@components/layouts/store'
import type { RecipeRecord } from '@pages/brew/types'
import { alertServerError } from '@services/alert'
import { PIER_API } from '@services/env'

export const getRecipes = async () => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/brew/recipes`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as RecipeRecord[]
  return data
}

export const getRecipe = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/brew/recipe/${id}`)
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  const data = await res.json() as RecipeRecord
  return data
}

export const createRecipe = async (record: RecipeRecord) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/brew/recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  return true
}

export const updateRecipe = async (record: RecipeRecord) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/brew/recipe`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  return true
}

export const removeRecipe = async (id: number) => {
  busy.set(true)
  const res = await fetch(`${PIER_API}/brew/recipe/${id}`, {
    method: 'DELETE',
  })
  busy.set(false)
  if (!res.ok) return alertServerError(res)
  return true
}
