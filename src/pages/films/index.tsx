import { useAppContext } from "@/app/components/AppContext"
import TableView from "@/app/components/TableView"
import { filmColumnNames } from "@/app/components/columns"
import { filmEndpoint } from "@/app/endpoints"
import { fetcher } from "@/app/fetchers"

export const getServerSideProps = async () => {
    const response = await fetcher(filmEndpoint)
    return {
      props: {
        films: response.results,
      },
    }
  }

type FilmsPageProps = {
    films: []
    initialNextPage: string | null
  }

const FilmsPage = ({ films }: FilmsPageProps) => {
    const resourceMap = useAppContext();

    const transformFilms = (films: any[]) => {
        return films.map((film) => {
            return {
                ...film,
                characters: film.characters.map((character: string) => resourceMap.get(character) || character),
                planets: film.planets.map((planet:string) => resourceMap.get(planet) || planet),
                starships: film.starships.map((starship: string) => resourceMap.get(starship) || starship),
                vehicles: film.vehicles.map((vehicle: string) => resourceMap.get(vehicle) || vehicle),
            }
        })
    }

    return <main>
        <TableView title="Films" rows={transformFilms(films)} columns={filmColumnNames} />
    </main>
}

export default FilmsPage;
  