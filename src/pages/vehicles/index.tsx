import { useAppContext } from "@/app/components/AppContext"
import TableView from "@/app/components/TableView"
import { vehicleColumnNames } from "@/app/components/columns"
import { vehicleEndpoint } from "@/app/endpoints"
import { fetcher } from "@/app/fetchers"
import { Vehicle } from "@/app/types"
import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"

export const getServerSideProps = async () => {
    const response = await fetcher(vehicleEndpoint)
    return {
      props: {
        initialVehicles: response.results,
        initialNextPage: response.next,
      },
    }
  }

type VehiclesPageProps = {
    initialVehicles: []
    initialNextPage: string | null
  }

const VehiclesPage = ({ initialVehicles, initialNextPage }: VehiclesPageProps) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
    const [next, setNext] = useState(initialNextPage)
    const { data, error } = useSWR(next, fetcher, { revalidateOnFocus: false })
    const resourceMap = useAppContext();


    const transformVehicles = (vehicles: any[]) => {
        return vehicles.map((vehicle) => {
            return {
                ...vehicle,
                pilots: vehicle.pilots.map((character: string) => resourceMap.get(character) || character),
                films: vehicle.films.map((film:string) => resourceMap.get(film) || film),
            }
        })
    }


  // Optimized handler for fetching the next page
  const handleFetchNextPage = useCallback(() => {
    if (data) {
      setVehicles((prevPeople) => [...prevPeople, ...data.results])
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

    return <main>
        <TableView title="Vehicles" rows={transformVehicles(vehicles)} columns={vehicleColumnNames} />
    </main>
}

export default VehiclesPage;
  