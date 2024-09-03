import DetailPage from '@/app/components/DetailPage'
import { filmEndpoint } from '@/app/endpoints'
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
  } = useSWR(`${filmEndpoint}/${id}`, fetcher)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || id === undefined) {
    return <div>Failed to load</div>
  }

  return (
    <DetailPage
      id={id as string}
      resourceType="films"
      isLoading={isLoading}
      error={error}
      data={film}
      skip={skip}
    />
  )
}
export default FilmDetailPage