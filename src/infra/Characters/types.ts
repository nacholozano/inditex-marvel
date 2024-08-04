// Characters
export type GetCharactersFilter = {
  nameStartsWith?: string
  limit?: number
}

export type RawCharacter = {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export type RawCharactersList = {
  results: RawCharacter[]
}

// Comics
export type GetComicsFilter = {
  orderBy?: string
  limit?: number
}

export type RawComic = {
  id: number
  title: string
  thumbnail: { path: string; extension: string }
  dates: { type: string; date: string }[]
}

export type RawComicsList = {
  results: RawComic[]
}
