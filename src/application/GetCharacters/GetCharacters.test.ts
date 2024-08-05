import { CharacterService } from 'infra/Characters/Characters.sevice'
import { HttpClient } from 'infra/httpClient'
import { Character } from 'domain/Character/Character'
import getCharactersList from 'application/GetCharacters/GetCharacters'
import { GetCharactersFilter, RawCharactersList } from 'infra/Characters/types'

jest.mock('config/config')

describe('GetCharacters', () => {
  let charactersService: CharacterService
  let httpClient: HttpClient
  let getCharactersListFn: (
    filters: GetCharactersFilter
  ) => Promise<Character[]>

  beforeEach(() => {
    httpClient = new HttpClient()
    charactersService = new CharacterService(httpClient)

    getCharactersListFn = getCharactersList(charactersService)
  })

  test('no cached data', async () => {
    jest
      .spyOn(charactersService, 'getCachedCharacters')
      .mockReturnValue(undefined)

    const mockCharacters = {
      results: [
        {
          id: 1,
          name: 'Name',
          description: 'desc',
          thumbnail: {
            path: 'url',
            extension: 'jpg',
          },
        },
      ],
    }

    const spyGetCharacters = jest
      .spyOn(charactersService, 'getCharacters')
      .mockReturnValue(Promise.resolve(mockCharacters))

    const spySetCachedCharacters = jest.spyOn(
      charactersService,
      'setCachedCharacters'
    )

    const result = await getCharactersListFn({})

    const { id, name, description, img } = result[0]

    expect(id).toBe(1)
    expect(name).toBe('Name')
    expect(description).toBe('desc')
    expect(img).toBe('url.jpg')

    expect(spyGetCharacters).toHaveBeenCalledWith({})
    expect(spySetCachedCharacters).toHaveBeenCalledWith(
      undefined,
      mockCharacters
    )
  })

  test('cached data', async () => {
    const mockCharacters = {
      results: [
        {
          id: 1,
          name: 'Name',
          description: 'desc',
          thumbnail: {
            path: 'url',
            extension: 'jpg',
          },
        },
      ],
    }

    jest
      .spyOn(charactersService, 'getCachedCharacters')
      .mockReturnValue(mockCharacters)

    const spyGetCharacters = jest
      .spyOn(charactersService, 'getCharacters')
      .mockReturnValue(Promise.resolve(mockCharacters))

    const spySetCachedCharacters = jest.spyOn(
      charactersService,
      'setCachedCharacters'
    )

    const result = await getCharactersListFn({})

    const { id, name, description, img } = result[0]

    expect(id).toBe(1)
    expect(name).toBe('Name')
    expect(description).toBe('desc')
    expect(img).toBe('url.jpg')

    expect(spyGetCharacters).not.toHaveBeenCalled()
    expect(spySetCachedCharacters).not.toHaveBeenCalled()
  })

  test('search by name', async () => {
    jest
      .spyOn(charactersService, 'getCachedCharacters')
      .mockReturnValue(undefined)

    const mockCharacters: RawCharactersList = {
      results: [],
    }

    const spyGetCharacters = jest
      .spyOn(charactersService, 'getCharacters')
      .mockReturnValue(Promise.resolve(mockCharacters))

    const spySetCachedCharacters = jest.spyOn(
      charactersService,
      'setCachedCharacters'
    )

    const filter = { nameStartsWith: 'name' }
    await getCharactersListFn(filter)

    expect(spyGetCharacters).toHaveBeenCalledWith(filter)
    expect(spySetCachedCharacters).toHaveBeenLastCalledWith(
      'name',
      mockCharacters
    )
  })
})
