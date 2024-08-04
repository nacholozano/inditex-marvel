import { characterService } from 'infra/Characters/Characters.sevice'
import getCharactersList from './GetCharacters/GetCharacters'
import getCharacter from './GetCharacter/GetCharacter'

const Application = {
  getCharactersList: getCharactersList(characterService),
  getCharacter: getCharacter(characterService),
}

export default Application
