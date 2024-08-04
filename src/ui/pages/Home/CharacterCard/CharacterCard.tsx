import { FC, MouseEvent } from 'react'
import { Props } from './types'
import styles from './styles.module.css'
import CuttedCorner from 'ui/components/CuttedCorner/CuttedCorner'
import CoverImage from 'ui/components/CoverImage/CoverImage'
import ToggleFav from 'ui/components/ToggleFav/ToggleFav'

const CharacterCard: FC<Props> = ({
  img,
  alt,
  name,
  isFavorite,
  onToggleAsFavorite,
}) => {
  const containerClasses = `${styles.container} ${isFavorite && styles.favorite}`

  const handleOnToggleAsFavorite = (event: MouseEvent) => {
    event.preventDefault()
    onToggleAsFavorite()
  }

  return (
    <div className={containerClasses} data-testid="character-card-container">
      <CoverImage img={img} alt={alt} />
      <CuttedCorner>
        <div className={styles.infoContainer}>
          <div className={styles.title} data-testid="title">
            {name}
          </div>
          <div>
            <ToggleFav
              size={16}
              isFavorite={isFavorite}
              onClick={handleOnToggleAsFavorite}
            />
          </div>
        </div>
      </CuttedCorner>
    </div>
  )
}

export default CharacterCard
