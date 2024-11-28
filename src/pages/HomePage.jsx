import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0); // Paginación: el offset inicial es 0
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      const data = await response.json();

      const formattedPokemons = data.results.map((pokemon, index) => {
        const id = offset + index + 1; // Calcula el ID basándote en el offset
        return {
          id,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          types: [], // Puedes incluir los tipos si los obtienes de otra llamada
        };
      });

      setPokemons(formattedPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [offset]); // Ejecuta el efecto cada vez que cambie el offset

  const toggleFavorite = (pokemon) => {
    const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      updatedFavorites = [...favorites, pokemon];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>Pokémon</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="pokemon-grid">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
              />
            ))}
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
              disabled={offset === 0}
            >
              Anterior
            </button>
            <button onClick={() => setOffset((prev) => prev + 20)}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;