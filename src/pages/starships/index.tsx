import DataPage from '@/app/components/DataPage'
import { starshipColumnNames } from '@/app/components/columns'
import { starshipEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/fetchers'

export const getServerSideProps = async () => {
  const response = await fetcher(starshipEndpoint)
  return {
    props: {
      intialStarShips: response.results,
      initialNextPage: response.next,
    },
  }
}

const transformStarships = (
  starships: any[],
  resourceMap: Map<string, string>,
) => {
  return starships.map((starship) => {
    return {
      ...starship,
      pilots: starship.pilots.map(
        (character: string) => resourceMap.get(character) || character,
      ),
      films: starship.films.map(
        (film: string) => resourceMap.get(film) || film,
      ),
    }
  })
}

type StarshipProps = {
  initialStarShips: []
  initialNextPage: string | null
}

const StarshipPage = ({ initialStarShips, initialNextPage }: StarshipProps) => {
  return (
    <DataPage
      title="Planets"
      columns={starshipColumnNames}
      initialData={initialStarShips}
      initialNextPage={initialNextPage}
      transformData={transformStarships}
    />
  )
}

export default StarshipPage
