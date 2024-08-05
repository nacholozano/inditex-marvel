import { HttpClient } from 'infra/httpClient'
import { CharacterService } from './Characters.sevice'

jest.mock('config/config')

describe('Characters service', () => {
  let httpClient: HttpClient
  let characterService: CharacterService

  beforeEach(() => {
    httpClient = new HttpClient()
    characterService = new CharacterService(httpClient)
  })

  test('getCharacters', () => {
    jest.spyOn(httpClient, 'buildParams').mockReturnValue('params')
    const getSpy = jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(Promise.resolve('result'))

    characterService.getCharacters()

    expect(getSpy).toHaveBeenCalledWith('characters?params')
  })

  test('getComics', () => {
    jest.spyOn(httpClient, 'buildParams').mockReturnValue('params')
    const getSpy = jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(Promise.resolve('result'))

    characterService.getComics(1)

    expect(getSpy).toHaveBeenCalledWith('characters/1/comics?params')
  })

  test('getCachedCharacters success', () => {
    characterService.setCachedCharacters('test', { results: [] })

    expect(characterService.getCachedCharacters('test')).toEqual({
      results: [],
    })
  })

  test('getCachedCharacters error', () => {
    expect(characterService.getCachedCharacters('test')).toBe(undefined)
  })

  test('getCachedCharacterComics success', () => {
    characterService.setCachedCharacterComics(1, { results: [] })

    expect(characterService.getCachedCharacterComics(1)).toEqual({
      results: [],
    })
  })

  test('getCachedCharacterComics error', () => {
    expect(characterService.getCachedCharacterComics(1)).toBe(undefined)
  })
})
