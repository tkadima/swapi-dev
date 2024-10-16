import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import {
  filmEndpoint,
  peopleEndpoint,
  planetEndpoint,
  speciesEndpoint,
  starshipEndpoint,
  vehicleEndpoint,
} from '../endpoints'

// Create the context
const AppContext = createContext<any>(null)

// Provider component that fetches all data
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Individual maps for each resource type
  const [peopleMap, setPeopleMap] = useState<Map<string, string>>(new Map())
  const [filmsMap, setFilmsMap] = useState<Map<string, string>>(new Map())
  const [vehiclesMap, setVehiclesMap] = useState<Map<string, string>>(new Map())
  const [planetsMap, setPlanetsMap] = useState<Map<string, string>>(new Map())
  const [starshipsMap, setStarshipsMap] = useState<Map<string, string>>(
    new Map(),
  )
  const [speciesMap, setSpeciesMap] = useState<Map<string, string>>(new Map())
  const [peopleSpeciesMap, setPeopleSpeciesMap] = useState<Map<string, string>>(
    new Map(),
  )

  // Function to fetch one page of records and return the results and the next URL
  const fetchPage = async (url: string) => {
    const { data } = await axios.get(url)
    return {
      results: data.results,
      next: data.next,
    }
  }

  // Function to fetch and update the map for a specific resource
  const fetchResource = async (
    endpoint: string,
    setMap: React.Dispatch<React.SetStateAction<Map<string, string>>>,
  ) => {
    let url = endpoint
    let map = new Map<string, string>()

    while (url) {
      const { results, next } = await fetchPage(url)
      results.forEach((item: any) => {
        const name = item.name || item.title
        map.set(item.url, name)
      })
      setMap(new Map(map)) // Update the state with the current data
      url = next // Update the URL to the next page
    }
  }

  // Function to fetch all species and map people to species
  const fetchSpeciesAndMapPeople = async () => {
    let url = speciesEndpoint
    const speciesToPeopleMap = new Map<string, string>()

    while (url) {
      const { results, next } = await fetchPage(url)
      results.forEach((species: any) => {
        const speciesUrl = species.url
        species.people.forEach((personUrl: string) => {
          speciesToPeopleMap.set(personUrl, speciesUrl)
        })
      })
      setPeopleSpeciesMap(new Map(speciesToPeopleMap))
      url = next
    }
  }

  useEffect(() => {
    // Fetch the first page for each resource, then continue fetching if more pages are available
    const fetchAllResources = () => {
      fetchResource(filmEndpoint, setFilmsMap)
      fetchResource(peopleEndpoint, setPeopleMap)
      fetchResource(vehicleEndpoint, setVehiclesMap)
      fetchResource(planetEndpoint, setPlanetsMap)
      fetchResource(starshipEndpoint, setStarshipsMap)
      fetchResource(speciesEndpoint, setSpeciesMap)

      // Fetch species and map people to their species
      fetchSpeciesAndMapPeople()
    }

    fetchAllResources()
  }, [])

  return (
    <AppContext.Provider
      value={{
        peopleMap,
        filmsMap,
        vehiclesMap,
        planetsMap,
        starshipsMap,
        speciesMap,
        peopleSpeciesMap,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext)
