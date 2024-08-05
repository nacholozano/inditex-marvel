import Application from 'application'
import { Character } from 'domain/Character/Character'
import CharacterPage from 'ui/pages/Character/Character'
import { render, screen, act, within } from '@testing-library/react'
import FavoritesContext from 'ui/contexts/favorites/favorites'
import '@testing-library/jest-dom'

jest.mock('config/config')

describe('Character page', () => {
  test('display character info', async () => {
    jest.spyOn(Application, 'getCharacter').mockReturnValue(
      Promise.resolve(
        new Character({
          id: 123,
          name: 'Spider-man',
          description: 'Tu vecino y amigo',
          img: '',
          comics: [
            {
              id: 1,
              name: 'Comic 1',
              img: '',
              onSaleDate: new Date(2021, 1, 1).toString(),
            },
            {
              id: 2,
              name: 'Comic 2',
              img: '',
              onSaleDate: new Date(2020, 1, 1).toString(),
            },
          ],
        })
      )
    )

    await act(async () => {
      render(<CharacterPage />)
    })

    expect(screen.getByTestId('name')).toHaveTextContent('Spider-man')
    expect(screen.getByTestId('desc')).toHaveTextContent('Tu vecino y amigo')

    const comics = screen.getAllByTestId('comic')
    const firstCcmic = comics[0]

    expect(comics).toHaveLength(2)

    expect(within(firstCcmic).getByTestId('comic-name')).toHaveTextContent(
      'Comic 1'
    )
    expect(within(firstCcmic).getByTestId('comic-desc')).toHaveTextContent(
      '2021'
    )
  })

  test('no comics', async () => {
    jest.spyOn(Application, 'getCharacter').mockReturnValue(
      Promise.resolve(
        new Character({
          id: 123,
          name: 'Spider-man',
          description: 'Tu vecino y amigo',
          img: '',
          comics: [],
        })
      )
    )

    await act(async () => {
      render(<CharacterPage />)
    })

    const comics = screen.queryAllByTestId('comic')

    expect(comics).toHaveLength(0)
  })

  test('toogle character from favorites list', async () => {
    const mockCharacter = new Character({
      id: 123,
      name: 'Spider-man',
      description: 'Tu vecino y amigo',
      img: '',
    })

    jest
      .spyOn(Application, 'getCharacter')
      .mockReturnValue(Promise.resolve(mockCharacter))

    const favorites: { [key: string]: Character } = {}
    const toggleCharacter = jest.fn()

    await act(async () => {
      render(
        <FavoritesContext.Provider value={{ favorites, toggleCharacter }}>
          <CharacterPage />
        </FavoritesContext.Provider>
      )
    })

    screen.getByLabelText('add to favorites').click()

    expect(toggleCharacter).toHaveBeenCalledWith(mockCharacter)
  })
})
