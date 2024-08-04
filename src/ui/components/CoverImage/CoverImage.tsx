import { FC } from 'react'
import { Props } from './types'
import styles from './styles.module.css'

const CoverImage: FC<Props> = ({ img, alt }) => {
  return (
    <div
      className={styles.imgContainer}
      style={{ backgroundImage: 'url(' + img + ')' }}
    >
      <img src={img} className={styles.img} alt={alt} />
    </div>
  )
}

export default CoverImage
