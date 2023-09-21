export type Pokemon = {
    id: string;
    pokemon_id: string;
    name: string;
    default_sprite: string;
    types: string;
    user_id: string;
}

export type PokemonAppData = {
    pokemons?: Array<Pokemon>;
    userId: string;
}

export type PokemonContextType = {
    pokemonContext: Array<Pokemon>;
    setPokemons: (value: Array<Pokemon>) => void;
    userIdContext: string;
    setUserIdContext: (value: string) => void;
}