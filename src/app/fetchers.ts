import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
export const getId = (url: string) => url.split('/').slice(-2, -1)[0]
export const setNameIdPair = (url: string, resourceMap: Map<string, string>) => ({name: resourceMap.get(url) || url, id: getId(url)})
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