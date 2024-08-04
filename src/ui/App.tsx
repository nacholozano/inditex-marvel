import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'ui/styles.css'
import Header from 'ui/components/Header/Header'
import Home from './pages/Home/Home'
import Character from './pages/Character/Character'
import FavoritesProvider from './contexts/favorites/FavoritesProvider'
import LoadingProvider from './contexts/loading/LoadingProvider'
import FilterProvider from './contexts/filter/FilterProvider'
import styles from './styles.module.css'

function App() {
  return (
    <>
      <LoadingProvider>
        <FilterProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Header />
              <main className={styles.container}>
                <Routes>
                  <Route
                    path="/characters/:characterId/*"
                    Component={Character}
                  ></Route>
                  <Route path="/" Component={Home}></Route>
                </Routes>
              </main>
            </BrowserRouter>
          </FavoritesProvider>
        </FilterProvider>
      </LoadingProvider>
    </>
  )
}

export default App
