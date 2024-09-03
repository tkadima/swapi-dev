import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
export const getId = (url: string) => url.split('/').slice(-2, -1)[0]
