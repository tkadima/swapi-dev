import DetailPage from '@/app/components/DetailPage'
import { speciesEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/fetchers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const SpeciesDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const skip = ['created', 'edited', 'url']

  const {
    data: species,
    isLoading,
    error,
  } = useSWR(`${speciesEndpoint}/${id}`, fetcher)

  return (
    <DetailPage
      id={id as string}
      resourceType="species"
      isLoading={isLoading}
      error={error}
      data={species}
      skip={skip}
    />
  )
}
export default SpeciesDetailPage
