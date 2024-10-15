import { useAppContext } from '@/app/components/AppContext'
import DetailPage from '@/app/components/DetailPage'
import { vehicleEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/helpers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const VehicleDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const skip = ['created', 'edited', 'url']

  const {
    data: vehicle,
    isLoading,
    error,
  } = useSWR(`${vehicleEndpoint}/${id}`, fetcher)

  const { peopleMap, filmsMap } = useAppContext();

  return (
    <DetailPage
      id={id as string}
      resourceType="vehicles"
      isLoading={isLoading}
      error={error}
      resourceMap={
        new Map<string, string>([...peopleMap, ...filmsMap])
      }
      data={vehicle}
      skip={skip}
    />
  )
}
export default VehicleDetailPage
