import { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Character as ChacacterClass /* , Character */,
} from 'domain/Character/Character'
import FavoritesContext from 'ui/contexts/favorites/favorites'
import LoadingContext from 'ui/contexts/loading/loading'
import FilterContext from 'ui/contexts/filter/filter'
import Application from 'application'
import Header from './Header/Header'
import Comics from './Comics/Comics'

const Character: FC = () => {
  const { characterId } = useParams()
  const { favorites, toggleCharacter } = useContext(FavoritesContext)
  const { loading, setLoading } = useContext(LoadingContext)
  const { filter } = useContext(FilterContext)
  const { term } = filter

  const [character, setCharacter] = useState(new ChacacterClass({}))
  const [comics, setComics] = useState([])

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true)

      const favorite = favorites[Number(characterId)] || new ChacacterClass({})

      const characterInfo = await Application.getCharacter(
        Number(characterId),
        term,
        {
          limit: 20,
          orderBy: '-onsaleDate',
        }
      )

      const { id, name, description, img } = favorite
      const characterToDiaplay = new ChacacterClass({
        id,
        name,
        description,
        img,
        comics: characterInfo.comics,
      })

      setCharacter(characterToDiaplay)

      setComics(
        characterInfo.comics.map(({ id, img, name, onSaleDate }) => ({
          id,
          img,
          name,
          desc: new Date(onSaleDate).getFullYear(),
        }))
      )

      setLoading(false)
    }

    if (!character.id) {
      getCharacter()
    }
  }, [characterId, term, character, favorites, setLoading])

  const handleFav = () => {
    toggleCharacter(character)
  }

  const { id, name, description, img } = character

  return loading ? null : (
    <div>
      <Header
        desc={description}
        name={name}
        img={img}
        isFavorite={Boolean(favorites[id])}
        onToggleCharacter={handleFav}
      />
      <Comics list={comics} />
    </div>
  )
}

export default Character
