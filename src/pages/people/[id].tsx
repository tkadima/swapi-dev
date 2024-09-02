import DetailPage from '@/app/components/DetailPage'
import { peopleEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/fetchers'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const FilmDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const skip = ['created', 'edited', 'url']

  const {
    data: film,
    isLoading,
    error,
  } = useSWR(`${peopleEndpoint}/${id}`, fetcher)

  return (
    <DetailPage
      id={id as string}
      resourceType="characters"
      isLoading={isLoading}
      error={error}
      data={film}
      skip={skip}
    />
  )
}
export default FilmDetailPage
