import { peopleEndpoint } from '@/app/endpoints'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { peopleColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
import { Person } from '@/app/types'
import { useAppContext } from '@/app/components/AppContext'
import TableView from '@/app/components/TableView'

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

type PeoplePageProps = {
  initialPeople: []
  initialNextPage: string | null
}
const PeoplePage = ({ initialPeople, initialNextPage }: PeoplePageProps) => {
  const [people, setPeople] = useState<Person[]>(initialPeople)
  const [next, setNext] = useState(initialNextPage)
  const { data, error } = useSWR(next, fetcher, { revalidateOnFocus: false })

  const resourceMap = useAppContext()

  const transformPeople = (people: Person[]) => {
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

  // Optimized handler for fetching the next page
  const handleFetchNextPage = useCallback(() => {
    if (data) {
      setPeople((prevPeople) => [...prevPeople, ...data.results])
      setNext(data.next)
    }
  }, [data])

  useEffect(() => {
    // Only fetch if there's a next page available
    if (next && data) {
      handleFetchNextPage()
    }
  }, [next, data, handleFetchNextPage])

  if (error) return <div>failed to load</div>

  return (
    <main>
      <TableView
        title="Characters"
        rows={transformPeople(people)}
        columns={peopleColumnNames}
      />
    </main>
  )
}

export default PeoplePage
