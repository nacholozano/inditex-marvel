import { FC } from 'react'
import { Props } from './types'
import styles from './styles.module.css'

const Comics: FC<Props> = ({ list }) => {
  return (
    <div className={styles.comicsContainer}>
      <h2 className={styles.comicsTitle}>Comics</h2>
      {list.length ? (
        <ul className={styles.list}>
          {list.map(({ id, img, name, desc }) => (
            <li className={styles.item} key={id} data-testid="comic">
              <div className={styles.imgContainer}>
                <img src={img} className={styles.img} alt={name} />
              </div>
              <div className={styles.name} data-testid="comic-name">
                {name}
              </div>
              <div className={styles.desc} data-testid="comic-desc">
                {desc}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'No comics'
      )}
    </div>
  )
}

export default Comics
