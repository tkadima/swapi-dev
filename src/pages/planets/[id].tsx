import { useAppContext } from '@/app/components/AppContext'
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
  const { peopleMap, speciesMap, starshipsMap, vehiclesMap, filmsMap } =
    useAppContext()
  const resourceMap = new Map<string, string>([
    ...peopleMap,
    ...speciesMap,
    ...starshipsMap,
    ...vehiclesMap,
    ...filmsMap,
  ])
  return (
    <DetailPage
      id={id as string}
      resourceType="planets"
      isLoading={isLoading}
      error={error}
      resourceMap={resourceMap}
      data={planet}
      skip={skip}
    />
  )
}
export default PlanetDetailPage
