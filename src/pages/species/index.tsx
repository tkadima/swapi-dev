import { speciesEndpoint } from '@/app/endpoints'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { speciesColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
import { Species } from '@/app/types'
import { useAppContext } from '@/app/components/AppContext'
import TableView from '@/app/components/TableView'

export const getServerSideProps = async () => {
  const response = await fetcher(speciesEndpoint)
  const initialNextPage = response.next
  const initialSpecies = response.results
  return {
    props: {
      initialSpecies,
      initialNextPage,
    },
  }
}

type SpeciesPageProps = {
  initialSpecies: Species[]
  initialNextPage: string | null
}
const SpeciesPage = ({ initialSpecies, initialNextPage }: SpeciesPageProps) => {
  const [species, setSpecies] = useState<Species[]>(initialSpecies)
  const [next, setNext] = useState(initialNextPage)
  const { data, error } = useSWR(next, fetcher, { revalidateOnFocus: false })

  const resourceMap = useAppContext()

  const transformSpecies = (species: Species[]) => {
    return species.map((specie) => {
      return {
        ...specie,
        homeworld: resourceMap.get(specie.homeworld) || specie.homeworld,
        films: specie.films.map((film) => resourceMap.get(film) || film),
        people: specie.people.map(
          (personUrl) => resourceMap.get(personUrl) || personUrl,
        ),
      }
    })
  }

  // Optimized handler for fetching the next page
  const handleFetchNextPage = useCallback(() => {
    if (data) {
      setSpecies((prevSpecies) => [...prevSpecies, ...data.results])
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
        title="Species"
        rows={transformSpecies(species)}
        columns={speciesColumnNames}
      />
    </main>
  )
}

export default SpeciesPage
