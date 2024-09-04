import DetailPage from '@/app/components/DetailPage'
import { peopleEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/helpers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const PeopleDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const skip = ['created', 'edited', 'url']

  const {
    data: people,
    isLoading,
    error,
  } = useSWR(`${peopleEndpoint}/${id}`, fetcher)

  return (
    <DetailPage
      id={id as string}
      resourceType="characters"
      isLoading={isLoading}
      error={error}
      data={people}
      skip={skip}
    />
  )
}
export default PeopleDetailPage
