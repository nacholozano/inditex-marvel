import { HttpClient } from './httpClient'

const response: Response = {
  ok: true,
  json: () => Promise.resolve({ data: null }),
} as Response

global.fetch = jest.fn(() => Promise.resolve(response))

describe('HttpClient', () => {
  test('get', async () => {
    const client = new HttpClient('url.com/', '')

    const fetchSpy = jest.spyOn(global, 'fetch')

    await client.get('getData')

    expect(fetchSpy).toHaveBeenCalledWith('url.com/getData')
  })

  test('buildParams', () => {
    const client = new HttpClient('', 'api-key')

    const params = client.buildParams({
      a: '1',
      b: 2,
      c: '',
    })

    expect(params).toBe('a=1&b=2&apikey=api-key')
  })
})
