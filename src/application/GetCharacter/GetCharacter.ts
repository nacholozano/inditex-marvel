import { Character } from 'domain/Character/Character'
import { CharacterService } from 'infra/Characters/Characters.sevice'
import { GetComicsFilter } from 'infra/Characters/types'

const getCharacter =
  (characterService: CharacterService) =>
  async (
    id: number,
    term: string = '',
    filters: GetComicsFilter = {}
  ): Promise<Character> => {
    const characters = characterService.getCachedCharacters(term)
    const cachedComics = characterService.getCachedCharacterComics(id)

    const characterComics =
      cachedComics || (await characterService.getComics(id, filters))

    if (!cachedComics) {
      characterService.setCachedCharacterComics(id, characterComics)
    }

    const {
      id: idValue,
      name,
      description,
      thumbnail,
    } = characters?.results.find((character) => character.id === id) || {
      id: null,
      name: '',
      description: '',
      thumbnail: { path: '', extension: '' },
    }

    return new Character({
      id: idValue,
      name,
      description,
      img: `${thumbnail.path}.${thumbnail.extension}`,
      comics: characterComics.results.map(({ id, title, thumbnail, dates }) => {
        const onSaleDate =
          dates.find((date) => date.type === 'onsaleDate')?.date || ''

        return {
          id,
          name: title,
          img: `${thumbnail.path}.${thumbnail.extension}`,
          onSaleDate,
        }
      }),
    })
  }

export default getCharacter
