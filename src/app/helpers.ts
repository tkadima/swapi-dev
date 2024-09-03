import axios from 'axios'
import numeral from 'numeral'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
export const getId = (url: string) => url.split('/').slice(-2, -1)[0]
export const setNameIdPair = (
  url: string,
  resourceMap: Map<string, string>,
) => ({ name: resourceMap.get(url) || url, id: getId(url) })
export const fieldNames: any = {
  characters: 'people',
  pilots: 'people',
  residents: 'people',
  films: 'films',
  vehicles: 'vehicles',
  starships: 'starships',
  species: 'species',
  planets: 'planets',
  people: 'people',
  homeworld: 'planets',
}

export const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString()
  } else if (num < 1000000) {
    return numeral(num).format('0,0')
  } else {
    const formatted = numeral(num).format('0a')
    return formatted.replace(/([a-z])$/, (match) => match.toUpperCase())
  }
}
