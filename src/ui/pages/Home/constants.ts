import { Character } from 'domain/Character/Character'

export const filterData = (data: Character[], value: string) => {
  const newListedData = value
    ? data.filter((item) => {
        const includesInName = item.name.toLowerCase().includes(value)

        return includesInName
      })
    : data

  return newListedData
}
