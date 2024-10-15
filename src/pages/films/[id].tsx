import { useAppContext } from '@/app/components/AppContext'
import DetailPage from '@/app/components/DetailPage'
import { filmEndpoint } from '@/app/endpoints'
import { fetcher } from '@/app/helpers'
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

  const { peopleMap, vehiclesMap, planetsMap, starshipsMap, speciesMap } =
    useAppContext()

  const resourceMap = new Map<string, string>([
    ...peopleMap,
    ...vehiclesMap,
    ...planetsMap,
    ...starshipsMap,
    ...speciesMap,
  ])

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
      data={{
        ...film,
        release_date: new Date(film.release_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }}
      resourceMap={resourceMap}
      skip={skip}
    />
  )
}
export default FilmDetailPage
