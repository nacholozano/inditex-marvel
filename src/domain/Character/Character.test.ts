import { Character } from './Character'

describe('Character', () => {
  test('Default values', () => {
    const character = new Character({})

    const { id, name, img, description, comics } = character

    expect(id).toBe(null)
    expect(name).toBe('')
    expect(img).toBe('')
    expect(description).toBe('')
    expect(comics).toEqual([])
  })

  test('With values', () => {
    const character = new Character({
      id: 1,
      name: 'Name',
      img: 'character.jpg',
      description: 'desc',
      comics: [
        {
          id: 2,
          img: 'comic.jpg',
          name: 'Comic 1',
          onSaleDate: '2024-08-12',
        },
      ],
    })

    const { id, name, img, description, comics } = character

    expect(id).toBe(1)
    expect(name).toBe('Name')
    expect(img).toBe('character.jpg')
    expect(description).toBe('desc')
    expect(comics).toEqual([
      {
        id: 2,
        img: 'comic.jpg',
        name: 'Comic 1',
        onSaleDate: '2024-08-12',
      },
    ])
  })
})
