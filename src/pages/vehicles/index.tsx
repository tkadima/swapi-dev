import { useAppContext } from '@/app/components/AppContext'
import TablePage from '@/app/components/TablePage'
import { vehicleColumnNames } from '@/app/components/columns'
import { vehicleEndpoint } from '@/app/endpoints'
import { fetcher, setNameIdPair } from '@/app/helpers'
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
      pilots: vehicle.pilots.map((characterUrl: string) =>
        setNameIdPair(characterUrl, resourceMap),
      ),
      films: vehicle.films.map((filmUrl: string) =>
        setNameIdPair(filmUrl, resourceMap),
      ),
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
  const { peopleMap, filmsMap } = useAppContext()
  return (
    <TablePage
      title="vehicles"
      columns={vehicleColumnNames}
      initialData={initialVehicles}
      initialNextPage={initialNextPage}
      resourceMap={new Map([...peopleMap, ...filmsMap])}
      transformData={transformVehicles}
    />
  )
}

export default VehiclesPage
