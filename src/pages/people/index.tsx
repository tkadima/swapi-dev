import { peopleEndpoint } from '@/app/endpoints'
import { peopleColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
import { Person } from '@/app/types'
import TablePage from '@/app/components/TablePage'

export const getServerSideProps = async () => {
  const response = await fetcher(peopleEndpoint)
  const initialNextPage = response.next
  const initialPeople = response.results
  return {
    props: {
      initialPeople,
      initialNextPage,
    },
  }
}

const getId = (url: string) => url.split('/').slice(-2, -1)[0]

const transformPeople = (
  people: Person[],
  resourceMap: Map<string, string>,
) => {
  return people.map((person) => {
    return {
      ...person,
      homeworld: resourceMap.get(person.homeworld) || person.homeworld,
      films: person.films.map((film) => ({
        id: getId(film),
        title: resourceMap.get(film) || film,
      })),
      vehicles: person.vehicles.map((vehicle) => ({
        id: getId(vehicle),
        name: resourceMap.get(vehicle) || vehicle,
      })),
      starships: person.starships.map((starshipUrl) => ({
        id: getId(starshipUrl),
        name: resourceMap.get(starshipUrl) || starshipUrl,
        starshipUrl,
      })),
    }
  })
}

type PeoplePageProps = {
  initialPeople: []
  initialNextPage: string | null
}
const PeoplePage = ({ initialPeople, initialNextPage }: PeoplePageProps) => {
  return (
    <TablePage
      title="Characters"
      columns={peopleColumnNames}
      initialData={initialPeople}
      initialNextPage={initialNextPage}
      transformData={transformPeople}
    />
  )
}

export default PeoplePage
