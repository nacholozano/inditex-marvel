import { CharacterService } from 'infra/Characters/Characters.sevice'
import { Character } from 'domain/Character/Character'
import { GetCharactersFilter } from 'infra/Characters/types'

const getCharactersList =
  (characterService: CharacterService) =>
  async (filters: GetCharactersFilter = {}): Promise<Character[]> => {
    const { nameStartsWith: term } = filters

    const cachedData = characterService.getCachedCharacters(term || '')

    const rawData =
      cachedData || (await characterService.getCharacters(filters))

    if (!cachedData) {
      characterService.setCachedCharacters(term, rawData)
    }

    const characters = rawData?.results || []

    return characters.map((character) => {
      const { id, name, thumbnail, description } = character

      return new Character({
        id,
        name,
        img: thumbnail.path + '.' + thumbnail.extension,
        description,
      })
    })
  }

export default getCharactersList
