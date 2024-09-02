import { peopleEndpoint } from '@/app/endpoints'
import { peopleColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
import { Person } from '@/app/types'
import DataPage from '@/app/components/DataPage'

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
      homeworld: resourceMap.get(person.homeworld) || person.homeworld,
      films: person.films.map((film) => resourceMap.get(film) || film),
      vehicles: person.vehicles.map(
        (vehicle) => resourceMap.get(vehicle) || vehicle,
      ),
      starships: person.starships.map(
        (starship) => resourceMap.get(starship) || starship,
      ),
    }
  })
}

type PeoplePageProps = {
  initialPeople: []
  initialNextPage: string | null
}
const PeoplePage = ({ initialPeople, initialNextPage }: PeoplePageProps) => {
  return (
    <DataPage
      title="Characters"
      columns={peopleColumnNames}
      initialData={initialPeople}
      initialNextPage={initialNextPage}
      transformData={transformPeople}
    />
  )
}

export default PeoplePage
