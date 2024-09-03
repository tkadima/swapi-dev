import DetailPage from '@/app/components/DetailPage'
import { planetEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/helpers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const PlanetDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const skip = ['created', 'edited', 'url']

  const {
    data: planet,
    isLoading,
    error,
  } = useSWR(`${planetEndpoint}/${id}`, fetcher)

  return (
    <DetailPage
      id={id as string}
      resourceType="planets"
      isLoading={isLoading}
      error={error}
      data={planet}
      skip={skip}
    />
  )
}
export default PlanetDetailPage
