import DetailPage from '@/app/components/DetailPage'
import { starshipEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/helpers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const StarshipDetailsPage = () => {
  const router = useRouter()
  const { id } = router.query
  const skip = ['created', 'edited', 'url']

  const {
    data: species,
    isLoading,
    error,
  } = useSWR(`${starshipEndpoint}/${id}`, fetcher)

  return (
    <DetailPage
      id={id as string}
      resourceType="starships"
      isLoading={isLoading}
      error={error}
      data={species}
      skip={skip}
    />
  )
}
export default StarshipDetailsPage
