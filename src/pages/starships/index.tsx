import { useAppContext } from '@/app/components/AppContext'
import TableView from '@/app/components/TableView'
import { starshipColumnNames } from '@/app/components/columns'
import { starshipEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/fetchers'
import { Starship } from '@/app/types'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

export const getServerSideProps = async () => {
  const response = await fetcher(starshipEndpoint)
  return {
    props: {
      intialStarShips: response.results,
      initialNextPage: response.next,
    },
  }
}

type StarshipProps = {
  intialStarShips: []
  initialNextPage: string | null
}

const StarshipPage = ({ intialStarShips, initialNextPage }: StarshipProps) => {
  const [starship, setStarship] = useState<Starship[]>(intialStarShips)
  const [next, setNext] = useState(initialNextPage)
  const { data, error } = useSWR(next, fetcher, { revalidateOnFocus: false })
  const resourceMap = useAppContext()

  const transformStarships = (starships: any[]) => {
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

  // Optimized handler for fetching the next page
  const handleFetchNextPage = useCallback(() => {
    if (data) {
      setStarship((prevStarships) => [...prevStarships, ...data.results])
      setNext(data.next)
    }
  }, [data])

  useEffect(() => {
    // Only fetch if there's a next page available
    if (next && data) {
      handleFetchNextPage()
    }
  }, [next, data, handleFetchNextPage])

  if (error) return <main>Failed to load</main>

  return (
    <main>
      <TableView
        title="Starships"
        rows={transformStarships(starship)}
        columns={starshipColumnNames}
      />
    </main>
  )
}

export default StarshipPage
