import { Dispatch, SetStateAction, createContext } from 'react'

type Filter = { term: string }

const FilterContext = createContext<{
  filter: { term: string }
  setFilter: Dispatch<SetStateAction<Filter>>
}>({
  filter: { term: '' },
  setFilter: () => {},
})

export default FilterContext
