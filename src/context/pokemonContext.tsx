import { ReactNode, createContext, useState } from "react";
import { Pokemon } from "./types";

export const PokemonContext = createContext({});

interface Props {
    children: ReactNode;
}

export default function PokemonContextProvider({children}: Props) {
    const [pokemonContext, setPokemonContext] = useState<Array<Pokemon>>([])
    const [userIdContext, setUserIdContext] = useState<string>('')
    return <PokemonContext.Provider value={{pokemonContext, setPokemonContext, userIdContext, setUserIdContext}} >{children}</PokemonContext.Provider>
}