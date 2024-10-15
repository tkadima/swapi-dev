import { useAppContext } from '@/app/components/AppContext'
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

  const { planetsMap, speciesMap, starshipsMap, vehiclesMap, filmsMap } =
    useAppContext()
  const resourceMap = new Map<string, string>([
    ...planetsMap,
    ...speciesMap,
    ...starshipsMap,
    ...vehiclesMap,
    ...filmsMap,
  ])

  return (
    <DetailPage
      id={id as string}
      resourceType="characters"
      isLoading={isLoading}
      error={error}
      resourceMap={resourceMap}
      data={people}
      skip={skip}
    />
  )
}
export default PeopleDetailPage
