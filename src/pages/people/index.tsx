import { peopleEndpoint } from '@/app/endpoints'
import { peopleColumnNames } from '@/app/components/columns'
import { fetcher, setNameIdPair } from '@/app/fetchers'
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

const transformPeople = (
  people: Person[],
  resourceMap: Map<string, string>,
) => {
  return people.map((person) => {
    return {
      ...person,
      homeworld: setNameIdPair(person.homeworld, resourceMap),
      films: person.films.map((filmUrl) => setNameIdPair(filmUrl, resourceMap)),
      vehicles: person.vehicles.map((vehicleUrl) => setNameIdPair(vehicleUrl, resourceMap)),
      starships: person.starships.map((starshipUrl) => setNameIdPair(starshipUrl, resourceMap)),
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
