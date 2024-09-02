import { planetEndpoint } from '@/app/endpoints'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { planetColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
import { Planet } from '@/app/types'
import { useAppContext } from '@/app/components/AppContext'
import TableView from '@/app/components/TableView'

export const getServerSideProps = async () => {
  const response = await fetcher(planetEndpoint)
  const initialNextPage = response.next
  const initialPlanets = response.results
  return {
    props: {
      initialPlanets,
      initialNextPage,
    },
  }
}

type PlanetsPageProps = {
  initialPlanets: Planet[]
  initialNextPage: string | null
}
const PlanetsPage = ({ initialPlanets, initialNextPage }: PlanetsPageProps) => {
  const [planets, setPlanets] = useState<Planet[]>(initialPlanets)
  const [next, setNext] = useState(initialNextPage)
  const { data, error } = useSWR(next, fetcher, { revalidateOnFocus: false })

  const resourceMap = useAppContext()

  const tranasformPlanets = (planets: Planet[]) => {
    return planets.map((planet) => {
      return {
        ...planet,
        films: planet.films.map((film) => resourceMap.get(film) || film),
        residents: planet.residents.map(
          (vehicle) => resourceMap.get(vehicle) || vehicle,
        ),
      }
    })
  }

  // Optimized handler for fetching the next page
  const handleFetchNextPage = useCallback(() => {
    if (data) {
      setPlanets((prevPlanets) => [...prevPlanets, ...data.results])
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
        title="Planets"
        rows={tranasformPlanets(planets)}
        columns={planetColumnNames}
      />
    </main>
  )
}

export default PlanetsPage
