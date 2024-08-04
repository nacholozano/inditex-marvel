class HttpClient {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = baseUrl || ''
    this.apiKey = apiKey || ''
  }

  get<T>(url: string): Promise<T> {
    const apiUrl = this.baseUrl + url

    return fetch(apiUrl)
      .then(async (response) => {
        if (response.ok) return response.json()
        console.error('Network response was not ok.')
      })
      .then((response) => {
        return response.data
      })
  }

  buildParams(filters: { [key: string]: unknown }) {
    const entries = Object.entries({ ...filters, apikey: this.apiKey })

    const params = entries.length
      ? entries.reduce((acc, current) => {
          const [key, value] = current

          if (!value) {
            return acc
          }

          const filterParam = `${key}=${value}`

          return acc ? `${acc}&${filterParam}` : filterParam
        }, '')
      : ''

    return params
  }
}

export { HttpClient }
