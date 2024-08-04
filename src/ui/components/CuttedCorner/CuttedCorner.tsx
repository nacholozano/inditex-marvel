import { FC } from 'react'
import styles from './styles.module.css'
import { Props } from './types'

const CuttedCorner: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default CuttedCorner
