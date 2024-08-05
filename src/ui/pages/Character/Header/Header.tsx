import { FC } from 'react'
import { Props } from './types'
import styles from './styles.module.css'
import CuttedCorner from 'ui/components/CuttedCorner/CuttedCorner'
import CoverImage from 'ui/components/CoverImage/CoverImage'
import ToggleFav from 'ui/components/ToggleFav/ToggleFav'

const Header: FC<Props> = ({
  desc,
  img,
  name,
  isFavorite,
  onToggleCharacter,
}) => {
  return (
    <div className={styles.headerContainer}>
      <CuttedCorner>
        <div className={styles.container}>
          <div className={styles.content}>
            <div>
              <div className={styles.img}>
                <CoverImage img={img} alt={name} />
              </div>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.title}>
                <h1 className={styles.name} data-testid="name">
                  {name}
                </h1>
                <ToggleFav
                  size={24}
                  isFavorite={isFavorite}
                  onClick={onToggleCharacter}
                />
              </div>
              <p className={styles.desc} data-testid="desc">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </CuttedCorner>
    </div>
  )
}

export default Header
