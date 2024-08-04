import { FC, ReactElement, useState } from 'react'
import { Character } from 'domain/Character/Character'
import FavoritesContext from './favorites'

const FavoritesProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [favorites, setFavorites] = useState<{ [key: string]: Character }>({})

  const toggleCharacter = (character: Character) => {
    if (favorites[character.id]) {
      setFavorites((state) => {
        const stateWithoutCharacter = { ...state }
        delete stateWithoutCharacter[character.id]

        return stateWithoutCharacter
      })
    } else {
      setFavorites((state) => ({
        ...state,
        [character.id]: character,
      }))
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleCharacter }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
