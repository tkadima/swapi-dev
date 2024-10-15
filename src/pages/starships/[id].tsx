import { useAppContext } from '@/app/components/AppContext'
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

  const { peopleMap, filmsMap } = useAppContext(); 

  return (
    <DetailPage
      id={id as string}
      resourceType="starships"
      isLoading={isLoading}
      error={error}
      resourceMap={
        new Map<string, string>([...peopleMap, ...filmsMap])
      }
      data={species}
      skip={skip}
    />
  )
}
export default StarshipDetailsPage
