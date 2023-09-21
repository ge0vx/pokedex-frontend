export interface pokemonApiResponse {
  count: number,
  next: string,
  previous: string,
  results?: Pokemon[]
}

export interface Pokemon {
  name: string
  url: boolean
  image?: string 
}
