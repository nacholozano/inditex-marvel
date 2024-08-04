import { MouseEventHandler } from 'react'

export type Props = {
  isFavorite: boolean
  size: number
  onClick: MouseEventHandler<HTMLButtonElement>
}
