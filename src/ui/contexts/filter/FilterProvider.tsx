import { FC, ReactElement, useState } from 'react'
import FilterContext from './filter'

const FilterProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [filter, setFilter] = useState({ term: '' })

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
