//  INDEX

export type DatabaseIndex = {
  database: string
  collection: string
  facets: string
}[]

// DOCUMENT

export type DocModel = Record<string, any>

export type DocRecord = DocModel

// VIEW

export type Template = (doc: DocModel) => string

// EDIT

export enum Editor {
  name,
  boolean,
  string,
  text,
  markdown,
  date,
  datetime,
  select,
  tags,
  list,
  image,
}

export type DocEditor = {
  id: string
  editor: Editor
}

export type DocEditors = DocEditor[]

// MODEL

export type Autocompletes = Record<string, string[]>

export type AutocompleteFields = {
  selects: string[]
  tags: string[]
}

export type DatabaseModel = {
  blankDoc: DocModel
  docFromRecord: (docRecord: DocRecord) => DocModel
  recordFromDoc: (doc: DocModel) => DocRecord
  autocompleteFields: AutocompleteFields,
}

export type SearchModel = (q: string) => string


export type Facet = {
  name: string
  where: string
  order: string
}

// IMPORTER

export type ImporterSearchResult = {
  label: string
  value: any
  tooltip?: string
}

export type DatabaseImporter = Record<string, DatabaseImporterWorker>

export type DatabaseImporterWorker = {
  searchDoc: (doc: DocModel) => Promise<ImporterSearchResult[]>
  fetchDoc: (sr: ImporterSearchResult) => Promise<DocModel>
}
