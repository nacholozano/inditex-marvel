import { createContext } from 'react'
import { Character } from 'domain/Character/Character'

const FavoritesContext = createContext<{
  favorites: { [key: string]: Character }
  toggleCharacter: (character: Character) => void
}>({
  favorites: {},
  toggleCharacter: () => {},
})

export default FavoritesContext
