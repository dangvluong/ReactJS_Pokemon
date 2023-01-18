import React from "react";
import { Detail, Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = ({ pokemons, viewDetail, setDetail }) => {
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id,
        isOpened: true,
      });
    }
  };

  return (
    <section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
      {viewDetail.isOpened ? <div className="overlay"></div> : <div></div>}
      {pokemons.map((pokemon) => {
        return (
          <div onClick={() => selectPokemon(pokemon.id)}>
            <PokemonList
              viewDetail={viewDetail}
              setDetail={setDetail}
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              abilities={pokemon.abilities}
              image={pokemon.sprites.front_default}
            ></PokemonList>
          </div>
        );
      })}
    </section>
  );
};

export default PokemonCollection;
