import { HttpClient } from 'infra/httpClient'
import { config } from 'config/config'
import {
  RawCharactersList,
  GetCharactersFilter,
  GetComicsFilter,
  RawComicsList,
} from './types'

class CharacterService {
  private httpClient: HttpClient
  private cachedCharacters: { [key: string]: RawCharactersList } = {}
  private cachedCharacterComics: { [key: number]: RawComicsList } = {}

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  getCharacters(filters: GetCharactersFilter = {}): Promise<RawCharactersList> {
    const params = this.httpClient.buildParams(filters)

    return this.httpClient.get<RawCharactersList>(`characters?${params}`)
  }

  getComics(id: number, filters: GetComicsFilter = {}): Promise<RawComicsList> {
    const params = this.httpClient.buildParams(filters)

    return this.httpClient.get<RawComicsList>(
      `characters/${id}/comics?${params}`
    )
  }

  getCachedCharacters(term: string): RawCharactersList | undefined {
    return this.cachedCharacters[term]
  }

  setCachedCharacters(term: string = '', data: RawCharactersList) {
    this.cachedCharacters[term] = data
  }

  getCachedCharacterComics(id: number): RawComicsList | undefined {
    return this.cachedCharacterComics[id]
  }

  setCachedCharacterComics(id: number, data: RawComicsList) {
    this.cachedCharacterComics[id] = data
  }
}

const httpClient = new HttpClient(
  'https://gateway.marvel.com/v1/public/',
  config.apiKey
)
const characterService = new CharacterService(httpClient)

export { characterService, CharacterService }
