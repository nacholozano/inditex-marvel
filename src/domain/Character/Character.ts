type Props = {
  id?: number
  name?: string
  img?: string
  description?: string
  comics?: Comic[]
}

type Comic = { id: number; name: string; onSaleDate: string; img: string }

class Character {
  private _id: number
  private _name: string
  private _img: string
  private _description: string
  private _comics: Comic[]

  constructor({ id, name, img, description, comics }: Props) {
    this._id = id || null
    this._name = name || ''
    this._img = img || ''
    this._description = description || ''
    this._comics = comics || []
  }

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get img(): string {
    return this._img
  }

  public get description(): string {
    return this._description
  }

  public get comics(): Comic[] {
    return this._comics
  }
}

export { Character }
