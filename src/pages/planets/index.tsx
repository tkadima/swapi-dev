import DataPage from '@/app/components/DataPage'
import { planetEndpoint } from '@/app/endpoints'
import { planetColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
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
    films: planet.films.map((film) => resourceMap.get(film) || film),
    residents: planet.residents.map(
      (personUrl) => resourceMap.get(personUrl) || personUrl,
    ),
  }))
}

type PlanetsPageProps = {
  initialData: []
  initialNextPage: string | null
}

const PlanetsPage = ({ initialData, initialNextPage }: PlanetsPageProps) => {
  return (
    <DataPage
      title="Planets"
      columns={planetColumnNames}
      initialData={initialData}
      initialNextPage={initialNextPage}
      transformData={transformPlanets}
    />
  )
}

export default PlanetsPage
