import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (pokemon) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = storedFavorites.some((fav) => fav.id === pokemon.id);

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      updatedFavorites = [...storedFavorites, pokemon];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>Favoritos</h1>
      {favorites.length > 0 ? (
        favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            toggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        ))
      ) : (
        <p>No tienes Pokémon favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;