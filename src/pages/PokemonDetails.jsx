import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemons }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemon = pokemons.find((p) => p.id === parseInt(id));

  if (!pokemon) return <p>Pokémon not found!</p>;

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Types: {pokemon.types.join(', ')}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>Abilities: {pokemon.abilities.join(', ')}</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default PokemonDetails;