import TablePage from '@/app/components/TablePage'
import { vehicleColumnNames } from '@/app/components/columns'
import { vehicleEndpoint } from '@/app/endpoints'
import { fetcher, getId } from '@/app/fetchers'
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
        (character: string) => ({name: resourceMap.get(character) || character, id: getId(character)}),
      ),
      films: vehicle.films.map((film: string) => ({ title: resourceMap.get(film) || film, id: getId(film)})),
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
    <TablePage
      title="Vehicles"
      columns={vehicleColumnNames}
      initialData={initialVehicles}
      initialNextPage={initialNextPage}
      transformData={transformVehicles}
    />
  )
}

export default VehiclesPage
