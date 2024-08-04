import { FC, ReactElement, useState } from 'react'
import LoadingContext from './loading'

const LoadingProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
