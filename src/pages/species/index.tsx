import { speciesEndpoint } from '@/app/endpoints'
import { speciesColumnNames } from '@/app/components/columns'
import { fetcher, setNameIdPair } from '@/app/helpers'
import { Species } from '@/app/types'
import TablePage from '@/app/components/TablePage'
import { useAppContext } from '@/app/components/AppContext'

export const getServerSideProps = async () => {
  const response = await fetcher(speciesEndpoint)
  const initialNextPage = response.next
  const initialSpecies = response.results
  return {
    props: {
      initialSpecies,
      initialNextPage,
    },
  }
}

const transformSpecies = (species: any[], resourceMap: Map<string, string>) => {
  return species.map((specie) => {
    return {
      ...specie,
      homeworld:
        specie.homeworld && setNameIdPair(specie.homeworld, resourceMap),
      films:
        specie.films &&
        specie.films.map((filmUrl: string) =>
          setNameIdPair(filmUrl, resourceMap),
        ),
      people:
        specie.people &&
        specie.people.map((personUrl: string) =>
          setNameIdPair(personUrl, resourceMap),
        ),
    }
  })
}
type SpeciesPageProps = {
  initialSpecies: Species[]
  initialNextPage: string | null
}
const SpeciesPage = ({ initialSpecies, initialNextPage }: SpeciesPageProps) => {
  const { peopleMap, filmsMap, planetsMap } = useAppContext(); 
  const resourceMap = new Map<string, string>([
    ...peopleMap,
    ...filmsMap,
    ...planetsMap
  ]);
  return (
    <TablePage
      title="species"
      columns={speciesColumnNames}
      initialData={initialSpecies}
      initialNextPage={initialNextPage}
      resourceMap={resourceMap}
      transformData={transformSpecies}
    />
  )
}

export default SpeciesPage
