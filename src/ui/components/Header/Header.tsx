import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import FavoritesContext from 'ui/contexts/favorites/favorites'
import LoadingContext from 'ui/contexts/loading/loading'
import Logo from '../Logo/Logo'
import FavFill from '../Fav/FavFill.tsx/FavFill'

const Header: FC = () => {
  const { favorites } = useContext(FavoritesContext)
  const { loading } = useContext(LoadingContext)

  return (
    <header className={styles.header} data-testid="header-container">
      <div className={styles.container}>
        <div>
          <h1
            className={styles.title}
            data-testid="title"
            aria-label="go to home page"
          >
            <Link to="/">
              <Logo />
            </Link>
          </h1>
        </div>
        <div className={styles.favoritesContainer}>
          <Link to="/?showFavorites=true" aria-label="go to favorites">
            <div className={styles.favContent}>
              <FavFill size={24} />
              <span className={styles.favorites} aria-label="favorites count">
                {Object.keys(favorites).length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      {loading && <div className={styles.containerLoading}></div>}
    </header>
  )
}

export default Header
