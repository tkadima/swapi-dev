# SWAPI DEV Code Overview - WIP 

## Introduction 
This project uses the Star Wars API to display data about films, characters, vehicles, planets, starships, and species in a user-friendly interface. It fetches data dynamically from the API, processes it, and presents it with a responsive design.

## Folder Structure 
src
│
├── app
│   ├── components
│   │   ├── AppContext.tsx         # Fetches and manages global data via React Context
│   │   ├── AppNavBar.tsx          # Navigation bar component for the top of the page
│   │   ├── columns.tsx            # Defines the DataGrid columns for all the tables in the app
│   │   ├── DetailsPage.tsx        # Wrapper React component for "Details" pages
│   │   ├── ResourceLinks.tsx      # Renders links to other related resources
│   │   ├── TablePage.tsx          # Renders a <main> component with the TableView inside of it
│   │   └── TableView.tsx          # Wrapper component for a table, including the title and DataGrid
│   │
│   ├── endpoint.ts                # List of API endpoints as constants
│   ├── helpers.ts                 # Helper functions for fetching and formatting data
│   └── types.ts                   # TypeScript types used throughout the app
│
├── pages
│   ├── _app.tsx                   # Root-level wrapper for all pages, initializes global providers and CSS
│   ├── _document.tsx              # Custom HTML document structure (for modifying the <html> and <body>)
│   ├── global.css                 # Global styles applied to all pages
│   ├── index.tsx                  # Landing page that auto-reroutes to /films
│   │
│   ├── films
│   │   ├── index.tsx              # Displays the films table, data fetched via SSR
│   │   └── [id].tsx               # Displays details for a specific film
│   │
│   ├── people
│   │   ├── index.tsx              # Displays the people table, data fetched via SSR
│   │   └── [id].tsx               # Displays details for a specific person
│   │
│   ├── planets
│   │   ├── index.tsx              # Displays the planets table, data fetched via SSR
│   │   └── [id].tsx               # Displays details for a specific planet
│   │
│   ├── species
│   │   ├── index.tsx              # Displays the species table, data fetched via SSR
│   │   └── [id].tsx               # Displays details for a specific species
│   │
│   ├── starships
│   │   ├── index.tsx              # Displays the starships table, data fetched via SSR
│   │   └── [id].tsx               # Displays details for a specific starship
│   │
│   └── vehicles
│       ├── index.tsx              # Displays the vehicles table, data fetched via SSR
│       └── [id].tsx               # Displays details for a specific vehicle

## Technologies Used
* Next.js: For simplified routing and server-side rendering 
* React: building reusable UI components 
* Axios: Making API requests to Star Wars API 
* UseSwr: hook for efficient client-side fetching 

## State Management 
The global state is managed using the `Context API`. 
Resources (films, planets, vehicles, etc) from the API are often linked to other resources but the response only has urls. 
e.g. a call to  https://swapi.dev/api/people/1  will return data for Luke Skywalker including: `"films": [
		"https://swapi.dev/api/films/2/",
		"https://swapi.dev/api/films/6/",
		"https://swapi.dev/api/films/3/",
		"https://swapi.dev/api/films/1/",
		"https://swapi.dev/api/films/7/"
	],` 
We want to be able to display all the films this character is in with a link but it is not ideal to show just the link. The context creates and manages a state variable called `resourceMap`, a large map of all the resources' urls and their names so that we can quickly access the name/title of the resource from the url instead of doing additional fetching. 

Context also manages the state for `speciesMap` which matches the url for a character and it's species. The reason I do this is because some of the characters are missing their species but the response for a species lists all the characters that are of that species. The `speciesMap` fetches all the species and maps the character url to species and then uses `resourceMap` to get the name of the species to be displayed in the "people" table view. That way we have easy access to the species' name and the link to the resource. 

TODO: 
- SSR explai
- data fetching & pagination 
- MUI data grid 
- fix folder structure section 
- Add demo video 
