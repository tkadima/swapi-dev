import TablePage from '@/app/components/TablePage'
import { filmEndpoint } from '@/app/endpoints'
import { filmColumnNames } from '@/app/components/columns'
import { fetcher, setNameIdPair } from '@/app/fetchers'
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
    characters: film.characters.map((characterUrl) =>
      setNameIdPair(characterUrl, resourceMap),
    ),
    planets: film.planets.map((planet) => resourceMap.get(planet) || planet),
    starships: film.starships.map((starshipUrl) =>
      setNameIdPair(starshipUrl, resourceMap),
    ),
    vehicles: film.vehicles.map((vehicleUrl) =>
      setNameIdPair(vehicleUrl, resourceMap),
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
