import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CharacterCard from 'ui/pages/Home/CharacterCard/CharacterCard'
import FavoritesContext from 'ui/contexts/favorites/favorites'
import LoadingContext from 'ui/contexts/loading/loading'
import FilterContext from 'ui/contexts/filter/filter'
import Search from 'ui/components/Search/Search'
import { Character } from 'domain/Character/Character'
import Application from 'application'
import { GetCharactersFilter } from 'infra/Characters/types'
import styles from './styles.module.css'
import { filterData } from './constants'

const Home: FC = () => {
  const [searchParams] = useSearchParams()
  const { favorites, toggleCharacter } = useContext(FavoritesContext)
  const { loading, setLoading } = useContext(LoadingContext)
  const { filter, setFilter } = useContext(FilterContext)

  const [data, setData] = useState<Character[]>([])
  const [listedData, setListedData] = useState<Character[]>([])

  const input = useRef(null)
  const inputDebounce = useRef(null)

  const showFavorites = searchParams.get('showFavorites')
  const { term } = filter

  // Input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputDebounce.current) {
      clearTimeout(inputDebounce.current)
    }

    inputDebounce.current = setTimeout(() => {
      const value = event.target?.value

      if (showFavorites) {
        setListedData(filterData(data, value))
      } else {
        setFilter({
          term: value,
        })
      }
    }, 800)
  }

  // Handle characters list
  useEffect(() => {
    if (!showFavorites) {
      const getCharactersList = async (filters: GetCharactersFilter) => {
        setLoading(true)

        const characters = await Application.getCharactersList(filters)

        setListedData(characters)
        setLoading(false)
      }

      getCharactersList(!term ? { limit: 50 } : { nameStartsWith: term })

      input.current.value = term
    }
  }, [term, showFavorites, setLoading])

  // Handle favorites characters
  useEffect(() => {
    if (showFavorites) {
      input.current.value = ''

      const favoritesList = Object.entries(favorites).map(
        ([, character]) => character
      )

      setData(favoritesList)
      setListedData(favoritesList)
    }
  }, [showFavorites, favorites, setFilter])

  return (
    <div className={styles.container}>
      {showFavorites && <div className={styles.favoritesTitle}>Favorites</div>}
      <div className={styles.filter}>
        <div className={styles.inputContainer}>
          <Search />

          <input
            ref={input}
            aria-label="characters filter"
            className={styles.input}
            placeholder="SEARCH A CHARACTER..."
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <span className={styles.counter} aria-label="characters count">
          {loading ? 0 : listedData.length} results
        </span>
      </div>

      <ul className={styles.characterList}>
        {!loading &&
          listedData.map((item) => {
            const { id, name, img } = item

            return (
              <li key={id}>
                <Link
                  to={`/characters/${id}`}
                  className={styles.characterLink}
                  aria-label={`go to ${name} character page`}
                >
                  <CharacterCard
                    name={name}
                    alt={name}
                    isFavorite={Boolean(favorites[id])}
                    img={img}
                    onToggleAsFavorite={() => toggleCharacter(item)}
                  />
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Home
