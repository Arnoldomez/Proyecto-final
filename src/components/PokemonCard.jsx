import React from "react";

const PokemonCard = ({ pokemon, toggleFavorite, isFavorite }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Tipos: {pokemon.types?.join(", ")}</p>
      <button onClick={() => toggleFavorite(pokemon)}>
        {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
      </button>
    </div>
  );
};

export default PokemonCard;