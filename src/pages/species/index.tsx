import { speciesEndpoint } from '@/app/endpoints'
import { speciesColumnNames } from '@/app/components/columns'
import { fetcher } from '@/app/fetchers'
import { Species } from '@/app/types'
import TablePage from '@/app/components/TablePage'

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

const transformSpecies = (
  species: Species[],
  resourceMap: Map<string, string>,
) => {
  return species.map((specie) => {
    return {
      ...specie,
      homeworld: resourceMap.get(specie.homeworld) || specie.homeworld,
      films: specie.films.map((film) => resourceMap.get(film) || film),
      people: specie.people.map(
        (personUrl) => resourceMap.get(personUrl) || personUrl,
      ),
    }
  })
}
type SpeciesPageProps = {
  initialSpecies: Species[]
  initialNextPage: string | null
}
const SpeciesPage = ({ initialSpecies, initialNextPage }: SpeciesPageProps) => {
  return (
    <TablePage
      title="Species"
      columns={speciesColumnNames}
      initialData={initialSpecies}
      initialNextPage={initialNextPage}
      transformData={transformSpecies}
    />
  )
}

export default SpeciesPage
