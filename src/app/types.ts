
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  created: string;
  edited: string;
  url: string;
}
export interface Person { 
  name: string; 
  height: string; 
  mass: string; 
  hair_color: string; 
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string; 
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[]; 
  starships: string[];
  created: string; 
  edit: string; 
  url: string; 
}

export type Resource = Film | Person; 

export interface ListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Resource[]
}