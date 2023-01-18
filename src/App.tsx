import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Detail, Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
      setNextUrl(result.data.next);
      result.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    };

    getPokemon();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    let result = await axios.get(nextUrl);
    setNextUrl(result.data.next);
    result.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <header className="pokemon-header">Pokemon</header>
      <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail}></PokemonCollection>
      {!viewDetail.isOpened && (
        <div className="btn">
          <button onClick={loadMore}>{loading ? "Loading..." : "Load more"}</button>
        </div>
      )}
    </div>
  );
};

export default App;
