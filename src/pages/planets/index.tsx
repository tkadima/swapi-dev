import TablePage from '@/app/components/TablePage'
import { planetEndpoint } from '@/app/endpoints'
import { planetColumnNames } from '@/app/components/columns'
import { fetcher, getId } from '@/app/fetchers'
import { Planet } from '@/app/types'

export const getServerSideProps = async () => {
  const response = await fetcher(planetEndpoint)
  return {
    props: {
      initialData: response.results,
      initialNextPage: response.next,
    },
  }
}

const transformPlanets = (
  planets: Planet[],
  resourceMap: Map<string, string>,
) => {
  return planets.map((planet) => ({
    ...planet,
    films: planet.films.map((filmUrl) => ({
      id: getId(filmUrl),
      name: resourceMap.get(filmUrl) || filmUrl,
    })),
    residents: planet.residents.map((personUrl) => ({
      name: resourceMap.get(personUrl) || personUrl,
      id: getId(personUrl),
    })),
  }))
}

type PlanetsPageProps = {
  initialData: []
  initialNextPage: string | null
}

const PlanetsPage = ({ initialData, initialNextPage }: PlanetsPageProps) => {
  return (
    <TablePage
      title="Planets"
      columns={planetColumnNames}
      initialData={initialData}
      initialNextPage={initialNextPage}
      transformData={transformPlanets}
    />
  )
}

export default PlanetsPage
