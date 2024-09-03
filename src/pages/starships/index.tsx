import TablePage from '@/app/components/TablePage'
import { starshipColumnNames } from '@/app/components/columns'
import { starshipEndpoint } from '@/app/endpoints'
import { fetcher, getId } from '@/app/fetchers'
import { Starship } from '@/app/types'

export const getServerSideProps = async () => {
  const response = await fetcher(starshipEndpoint)
  return {
    props: {
      intialStarships: response.results,
      initialNextPage: response.next,
    },
  }
}

const transformStarships = (
  starships: Starship[],
  resourceMap: Map<string, string>,
) => {
  return starships.map((starship) => {
    return {
      ...starship,
      pilots: starship.pilots.map(
        (character: string) => ({name: resourceMap.get(character) || character, id: getId(character)}),
      ),
      films: starship.films.map(
        (film: string) => ({title: resourceMap.get(film) || film, id: getId(film)}),
      ),
    }
  })
}

type StarshipProps = {
  intialStarships: []
  initialNextPage: string | null
}

const StarshipPage = ({ intialStarships, initialNextPage }: StarshipProps) => {
  return (
    <TablePage
      title="Starships"
      columns={starshipColumnNames}
      initialData={intialStarships}
      initialNextPage={initialNextPage}
      transformData={transformStarships}
    />
  )
}

export default StarshipPage
