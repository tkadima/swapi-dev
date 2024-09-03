// AppContext.tsx
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

// Define the endpoints for each resource
const endpoints = {
  films: 'https://swapi.dev/api/films/',
  people: 'https://swapi.dev/api/people/',
  vehicles: 'https://swapi.dev/api/vehicles/',
  planets: 'https://swapi.dev/api/planets/',
  starships: 'https://swapi.dev/api/starships/',
  species: 'https://swapi.dev/api/species/',
}

// Create the context
const AppContext = createContext<any>(null)

// Provider component that fetches all data
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [resourceMap, setResourceMap] = useState<Map<string, string>>(new Map())
  const [peopleSpeciesMap, setPeopleSpeciesMap] = useState<Map<string, string>>(new Map());

  // Function to fetch all records from a given SWAPI endpoint and return a map
  const fetchAllRecords = async (endpoint: string) => {
    let url = endpoint
    const map = new Map<string, string>()

    while (url) {
      const { data } = await axios.get(url)
      data.results.forEach((item: any) => {
        // Assuming 'name' or 'title' contains the display name
        const name = item.name || item.title
        map.set(item.url, name)
      })
      url = data.next
    }
    return map
  }

    // Function to fetch all species and create a map of people to species
    const fetchSpeciesAndMapPeople = async () => {
      let url = endpoints.species;
      const speciesMap = new Map<string, string>();
  
      while (url) {
        const { data } = await axios.get(url);
        data.results.forEach((species: any) => {
          const speciesUrl = species.url;
          // Loop through the array of people URLs and map them to their species
          species.people.forEach((personUrl: string) => {
            speciesMap.set(personUrl, speciesUrl);
          });
        });
        url = data.next;
      }
  
      setPeopleSpeciesMap(speciesMap);
    };

  useEffect(() => {
    // Fetch all resources and create a combined map
    const fetchAllResources = async () => {
      const allMaps = await Promise.all([
        fetchAllRecords(endpoints.films),
        fetchAllRecords(endpoints.people),
        fetchAllRecords(endpoints.vehicles),
        fetchAllRecords(endpoints.planets),
        fetchAllRecords(endpoints.starships),
        fetchAllRecords(endpoints.species),
      ])

      // Merge all maps into a single map
      const combinedMap = new Map<string, string>()
      allMaps.forEach((map) => {
        map.forEach((value, key) => {
          combinedMap.set(key, value)
        })
      })

      setResourceMap(combinedMap)
      await fetchSpeciesAndMapPeople();
    }

    fetchAllResources()
  }, [])

  return (
    <AppContext.Provider value={{resourceMap, peopleSpeciesMap}}>{children}</AppContext.Provider>
  )
}

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext)
