import { FC } from 'react'
import FavFill from '../Fav/FavFill.tsx/FavFill'
import FavEmpty from '../Fav/FavEmpty/FavEmpty'
import { Props } from './types'
import styles from './styles.module.css'

const ToggleFav: FC<Props> = ({ isFavorite, size, onClick }) => {
  return (
    <button
      className={styles.favButton}
      onClick={onClick}
      aria-label={isFavorite ? 'remove from favorites' : 'add to favorites'}
    >
      {isFavorite ? <FavFill size={size} /> : <FavEmpty size={size} />}
    </button>
  )
}

export default ToggleFav
