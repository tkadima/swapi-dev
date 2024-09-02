import DetailPage from '@/app/components/DetailPage'
import { vehicleEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/fetchers'
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

  return (
    <DetailPage
      id={id as string}
      resourceType="vehicles"
      isLoading={isLoading}
      error={error}
      data={vehicle}
      skip={skip}
    />
  )
}
export default VehicleDetailPage
