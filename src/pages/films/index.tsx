import TablePage from '@/app/components/TablePage'
import { filmEndpoint } from '@/app/endpoints'
import { filmColumnNames } from '@/app/components/columns'
import { fetcher, getId } from '@/app/fetchers'
import { Film } from '@/app/types'

export const getServerSideProps = async () => {
  const response = await fetcher(filmEndpoint)
  return {
    props: {
      initialData: response.results,
      initialNextPage: null,
    },
  }
}

const transformFilms = (films: Film[], resourceMap: Map<string, string>) => {
  return films.map((film) => ({
    ...film,
    characters: film.characters.map(
      (character) => ({name: resourceMap.get(character) || character, id: getId(character)}),
    ),
    planets: film.planets.map((planet) => resourceMap.get(planet) || planet),
    starships: film.starships.map(
      (starship) => ({name: resourceMap.get(starship) || starship, id: getId(starship)}),
    ),
    vehicles: film.vehicles.map(
      (vehicle) => ({name: resourceMap.get(vehicle) || vehicle, id: getId(vehicle)})
    ),
  }))
}

type FilmsPageProps = {
  initialData: []
}

const FilmsPage = ({ initialData }: FilmsPageProps) => {
  return (
    <TablePage
      title="Films"
      columns={filmColumnNames}
      initialData={initialData}
      initialNextPage={null}
      transformData={transformFilms}
    />
  )
}

export default FilmsPage
