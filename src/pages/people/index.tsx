import { peopleEndpoint } from '@/app/endpoints'
import { peopleColumnNames } from '@/app/components/columns'
import { fetcher, setNameIdPair } from '@/app/helpers'
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
  peopleSpeciesMap: Map<string, string>,
) => {
  return people.map((person) => {
    const species = peopleSpeciesMap.get(person.url)
    person.species = species ? [species] : person.species
    return {
      ...person,
      homeworld: setNameIdPair(person.homeworld, resourceMap),
      films: person.films.map((filmUrl: string) =>
        setNameIdPair(filmUrl, resourceMap),
      ),
      species: person.species.map((speciesUrl) =>
        setNameIdPair(speciesUrl, resourceMap),
      ),
      vehicles: person.vehicles.map((vehicleUrl) =>
        setNameIdPair(vehicleUrl, resourceMap),
      ),
      starships: person.starships.map((starshipUrl) =>
        setNameIdPair(starshipUrl, resourceMap),
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
    <TablePage
      title="Characters"
      columns={peopleColumnNames}
      initialData={initialPeople}
      initialNextPage={initialNextPage}
      transformData={(data, resourceMap, peopleSpeciesMap) =>
        transformPeople(data, resourceMap, peopleSpeciesMap || new Map<string, string>())
      }
    />
  )
}

export default PeoplePage
