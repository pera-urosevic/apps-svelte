import type { DatabaseImporter, DatabaseModel, SearchModel } from '@pages/database/types'
import type { Component } from 'svelte'

export type DatabaseName = 'games' | 'notes' | 'places' | 'recipes' | 'stamps' | 'test'

// GAMES
import gamesModel from './games/model'
import gamesSearch from './games/search'
import gamesEditor from './games/Editor.svelte'
import gamesView from './games/View.svelte'
import gamesList from './games/List.svelte'
import gamesImporter from './games/importer'

// NOTES
import notesModel from './notes/model'
import notesSearch from './notes/search'
import notesEditor from './notes/Editor.svelte'
import notesView from './notes/View.svelte'
import notesList from './notes/List.svelte'
// import notesImporter from './notes/importer'

// PLACES
import placesModel from './places/model'
import placesSearch from './places/search'
import placesEditor from './places/Editor.svelte'
import placesView from './places/View.svelte'
import placesList from './places/List.svelte'
// import placesImporter from './places/importer'

// RECIPES
import recipesModel from './recipes/model'
import recipesSearch from './recipes/search'
import recipesEditor from './recipes/Editor.svelte'
import recipesView from './recipes/View.svelte'
import recipesList from './recipes/List.svelte'
// import recipesImporter from './recipes/importer'

// STAMPS
import stampsModel from './stamps/model'
import stampsSearch from './stamps/search'
import stampsEditor from './stamps/Editor.svelte'
import stampsView from './stamps/View.svelte'
import stampsList from './stamps/List.svelte'
// import stampsImporter from './stamps/importer'

// TEST
import modelTest from './test/model'
import testSearch from './test/search'
import testEditor from './test/Editor.svelte'
import testView from './test/View.svelte'
import testList from './test/List.svelte'
import testImporter from './test/importer'

const imports: Record<DatabaseName, any> = {
  games: { model: gamesModel, search: gamesSearch, Editor: gamesEditor, View: gamesView, List: gamesList, importer: gamesImporter, },
  notes: { model: notesModel, search: notesSearch, Editor: notesEditor, View: notesView, List: notesList, },
  places: { model: placesModel, search: placesSearch, Editor: placesEditor, View: placesView, List: placesList, },
  recipes: { model: recipesModel, search: recipesSearch, Editor: recipesEditor, View: recipesView, List: recipesList, },
  stamps: { model: stampsModel, search: stampsSearch, Editor: stampsEditor, View: stampsView, List: stampsList, },
  test: { model: modelTest, search: testSearch, Editor: testEditor, View: testView, List: testList, importer: testImporter, },
}

export const databaseModel = (database: DatabaseName): DatabaseModel => {
  return imports[database].model as DatabaseModel
}

export const databaseSearch = (database: DatabaseName): SearchModel => {
  return imports[database].search as SearchModel
}

export const databaseList = (database: DatabaseName): Component => {
  return imports[database].List as Component
}

export const databaseView = (database: DatabaseName): Component => {
  return imports[database].View as Component
}

export const databaseEditor = (database: DatabaseName): Component => {
  return imports[database].Editor as Component
}

export const databaseImporter = (database: DatabaseName): DatabaseImporter => {
  return imports[database].importer as DatabaseImporter
}
