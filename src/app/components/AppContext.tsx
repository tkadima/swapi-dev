import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
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

// Axios fetcher for useSWR
const fetcher = (url: string) => axios.get(url).then(res => res.data)

// Provider component that fetches all data
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Individual maps for each resource type
  const [peopleMap, setPeopleMap] = useState<Map<string, string>>(new Map())
  const [filmsMap, setFilmsMap] = useState<Map<string, string>>(new Map())
  const [vehiclesMap, setVehiclesMap] = useState<Map<string, string>>(new Map())
  const [planetsMap, setPlanetsMap] = useState<Map<string, string>>(new Map())
  const [starshipsMap, setStarshipsMap] = useState<Map<string, string>>(new Map())
  const [speciesMap, setSpeciesMap] = useState<Map<string, string>>(new Map())
  const [peopleSpeciesMap, setPeopleSpeciesMap] = useState<Map<string, string>>(new Map())

  // Function to fetch one page of records and return the results and the next URL
  const fetchPage = async (url: string) => {
    const { data } = await axios.get(url)
    return {
      results: data.results,
      next: data.next,
    }
  }

  // Function to fetch additional pages and update the map
  const fetchAdditionalPages = async (
    initialData: any,
    setMap: React.Dispatch<React.SetStateAction<Map<string, string>>>,
    endpoint: string
  ) => {
    let map = new Map<string, string>()
    let url = initialData.next

    while (url) {
      const { results, next } = await fetchPage(url)
      results.forEach((item: any) => {
        const name = item.name || item.title
        map.set(item.url, name)
      })
      setMap(prevMap => new Map([...Array.from(prevMap), ...Array.from(map)])) // Merge with previous state
      url = next
    }
  }

  // Function to handle species to people mapping
  const fetchSpeciesAndMapPeople = async (initialData: any) => {
    const speciesToPeopleMap = new Map<string, string>()
    let url = initialData.next

    while (url) {
      const { results, next } = await fetchPage(url)
      results.forEach((species: any) => {
        const speciesUrl = species.url
        species.people.forEach((personUrl: string) => {
          speciesToPeopleMap.set(personUrl, speciesUrl)
        })
      })
      setPeopleSpeciesMap(prevMap => new Map([...Array.from(prevMap), ...Array.from(speciesToPeopleMap)]))
      url = next
    }
  }

  // Use SWR to fetch the first page of each resource
  const { data: peopleData } = useSWR(peopleEndpoint, fetcher)
  const { data: filmsData } = useSWR(filmEndpoint, fetcher)
  const { data: vehiclesData } = useSWR(vehicleEndpoint, fetcher)
  const { data: planetsData } = useSWR(planetEndpoint, fetcher)
  const { data: starshipsData } = useSWR(starshipEndpoint, fetcher)
  const { data: speciesData } = useSWR(speciesEndpoint, fetcher)

  useEffect(() => {
    // Once first page data is fetched, update maps and fetch additional pages in the background
    if (peopleData) {
      const map = new Map<string, string>()
      peopleData.results.forEach((person: any) => {
        map.set(person.url, person.name)
      })
      setPeopleMap(map)
      fetchAdditionalPages(peopleData, setPeopleMap, peopleEndpoint) // Fetch remaining pages
    }

    if (filmsData) {
      const map = new Map<string, string>()
      filmsData.results.forEach((film: any) => {
        map.set(film.url, film.title)
      })
      setFilmsMap(map)
      fetchAdditionalPages(filmsData, setFilmsMap, filmEndpoint)
    }

    if (vehiclesData) {
      const map = new Map<string, string>()
      vehiclesData.results.forEach((vehicle: any) => {
        map.set(vehicle.url, vehicle.name)
      })
      setVehiclesMap(map)
      fetchAdditionalPages(vehiclesData, setVehiclesMap, vehicleEndpoint)
    }

    if (planetsData) {
      const map = new Map<string, string>()
      planetsData.results.forEach((planet: any) => {
        map.set(planet.url, planet.name)
      })
      setPlanetsMap(map)
      fetchAdditionalPages(planetsData, setPlanetsMap, planetEndpoint)
    }

    if (starshipsData) {
      const map = new Map<string, string>()
      starshipsData.results.forEach((starship: any) => {
        map.set(starship.url, starship.name)
      })
      setStarshipsMap(map)
      fetchAdditionalPages(starshipsData, setStarshipsMap, starshipEndpoint)
    }

    if (speciesData) {
      const map = new Map<string, string>()
      speciesData.results.forEach((species: any) => {
        map.set(species.url, species.name)
      })
      setSpeciesMap(map)
      fetchSpeciesAndMapPeople(speciesData) // Handle species to people mapping and fetch more pages
    }
  }, [peopleData, filmsData, vehiclesData, planetsData, starshipsData, speciesData])

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
