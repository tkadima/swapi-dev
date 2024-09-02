import DataPage from '@/app/components/DataPage'
import { vehicleColumnNames } from '@/app/components/columns'
import { vehicleEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/fetchers'
import { Vehicle } from '@/app/types'

export const getServerSideProps = async () => {
  const response = await fetcher(vehicleEndpoint)
  return {
    props: {
      initialVehicles: response.results,
      initialNextPage: response.next,
    },
  }
}

const transformVehicles = (
  vehicles: Vehicle[],
  resourceMap: Map<string, string>,
) => {
  return vehicles.map((vehicle) => {
    return {
      ...vehicle,
      pilots: vehicle.pilots.map(
        (character: string) => resourceMap.get(character) || character,
      ),
      films: vehicle.films.map((film: string) => resourceMap.get(film) || film),
    }
  })
}

type VehiclesPageProps = {
  initialVehicles: []
  initialNextPage: string | null
}

const VehiclesPage = ({
  initialVehicles,
  initialNextPage,
}: VehiclesPageProps) => {
  return (
    <DataPage
      title="Vehicles"
      columns={vehicleColumnNames}
      initialData={initialVehicles}
      initialNextPage={initialNextPage}
      transformData={transformVehicles}
    />
  )
}

export default VehiclesPage
