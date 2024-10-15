import TablePage from '@/app/components/TablePage'
import { filmEndpoint } from '@/app/endpoints'
import { filmColumnNames } from '@/app/components/columns'
import { fetcher, setNameIdPair } from '@/app/helpers'
import { Film } from '@/app/types'
import { useAppContext } from '@/app/components/AppContext'

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
    release_date: new Date(film.release_date).toLocaleDateString(),
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
  const { peopleMap, vehiclesMap, planetsMap, starshipsMap } = useAppContext()
  const resourceMap = new Map<string, string>([
    ...peopleMap,
    ...vehiclesMap,
    ...planetsMap,
    ...starshipsMap,
  ])
  return (
    <TablePage
      title="films"
      columns={filmColumnNames}
      initialData={initialData}
      initialNextPage={null}
      transformData={transformFilms}
      resourceMap={resourceMap}
    />
  )
}

export default FilmsPage
