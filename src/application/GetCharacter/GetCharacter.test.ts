import { CharacterService } from '../../infra/Characters/Characters.sevice'
import { HttpClient } from '../../infra/httpClient'
import { Character } from '../../domain/Character/Character'
import getCharacter from '../../application/GetCharacter/GetCharacter'
import { GetComicsFilter } from '../../infra/Characters/types'

jest.mock('../../config/config')

describe('GetCharacter', () => {
  let charactersService: CharacterService
  let httpClient: HttpClient
  let getCharacterFn: (
    id: number,
    term: string,
    filters: GetComicsFilter
  ) => Promise<Character>

  beforeEach(() => {
    httpClient = new HttpClient()
    charactersService = new CharacterService(httpClient)

    getCharacterFn = getCharacter(charactersService)
  })

  test('no cached data', async () => {
    jest.spyOn(charactersService, 'getCachedCharacters').mockReturnValue({
      results: [
        {
          id: 1,
          name: 'Character',
          description: '',
          thumbnail: {
            extension: 'jpg',
            path: 'character-url',
          },
        },
      ],
    })

    jest
      .spyOn(charactersService, 'getCachedCharacterComics')
      .mockReturnValue(undefined)

    const mockComics = {
      results: [
        {
          title: 'Comic 1',
          id: 23,
          dates: [{ date: '2023-09-10', type: 'onsaleDate' }],
          thumbnail: {
            extension: 'jpg',
            path: 'url',
          },
        },
      ],
    }

    const spyGetComics = jest
      .spyOn(charactersService, 'getComics')
      .mockReturnValue(Promise.resolve(mockComics))

    const spySetCachedCharacterComics = jest.spyOn(
      charactersService,
      'setCachedCharacterComics'
    )

    const result = await getCharacterFn(1, '', {})

    const { id, name, description, img, comics } = result

    expect(id).toBe(1)
    expect(name).toBe('Character')
    expect(description).toBe('')
    expect(img).toBe('character-url.jpg')
    expect(comics).toEqual([
      {
        id: 23,
        name: 'Comic 1',
        img: 'url.jpg',
        onSaleDate: '2023-09-10',
      },
    ])

    expect(spySetCachedCharacterComics).toHaveBeenCalledWith(1, mockComics)
    expect(spyGetComics).toHaveBeenCalledWith(1, {})
  })

  test('cached data', async () => {
    jest.spyOn(charactersService, 'getCachedCharacters').mockReturnValue({
      results: [
        {
          id: 1,
          name: 'Character',
          description: '',
          thumbnail: {
            extension: 'jpg',
            path: 'character-url',
          },
        },
      ],
    })

    const mockComics = {
      results: [
        {
          title: 'Comic 1',
          id: 23,
          dates: [{ date: '2023-09-10', type: 'onsaleDate' }],
          thumbnail: {
            extension: 'jpg',
            path: 'url',
          },
        },
      ],
    }

    jest
      .spyOn(charactersService, 'getCachedCharacterComics')
      .mockReturnValue(mockComics)

    const spyGetComics = jest.spyOn(charactersService, 'getComics')

    const spySetCachedCharacterComics = jest.spyOn(
      charactersService,
      'setCachedCharacterComics'
    )

    const result = await getCharacterFn(1, '', {})

    const { id, name, description, img, comics } = result

    expect(id).toBe(1)
    expect(name).toBe('Character')
    expect(description).toBe('')
    expect(img).toBe('character-url.jpg')
    expect(comics).toEqual([
      {
        id: 23,
        name: 'Comic 1',
        img: 'url.jpg',
        onSaleDate: '2023-09-10',
      },
    ])

    expect(spySetCachedCharacterComics).not.toHaveBeenCalled()
    expect(spyGetComics).not.toHaveBeenCalled()
  })
})
