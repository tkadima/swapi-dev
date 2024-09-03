import { speciesEndpoint } from '@/app/endpoints'
import { speciesColumnNames } from '@/app/components/columns'
import { fetcher, getId } from '@/app/fetchers'
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
      homeworld: specie.homeworld && ({name: resourceMap.get(specie.homeworld) || specie.homeworld, id: getId(specie.homeworld)}),
      films: specie.films && specie.films.map((film) => ({name: resourceMap.get(film) || film, id: getId(film)})),
      people: specie.people &&  specie.people.map(
        (personUrl) => ({id: getId(personUrl), name: resourceMap.get(personUrl) || personUrl}),
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
