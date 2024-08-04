import { FC } from 'react'
import { Props } from '../types'
import styles from './styles.module.css'

const FavFill: FC<Props> = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={styles.color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default FavFill
