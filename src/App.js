import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PokemonDetails from './pages/PokemonDetails';
import Favorites from './pages/Favorites';
import './styles/App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Cargar Pokémon desde la PokéAPI
  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 1; i <= 150; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((res) => res.json())
            .then((data) => ({
              id: data.id,
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
              types: data.types.map((type) => type.type.name),
              weight: data.weight,
              height: data.height,
              abilities: data.abilities.map((ability) => ability.ability.name),
            }))
        );
      }
      const results = await Promise.all(promises);
      setPokemons(results);
    };

    fetchPokemons();
  }, []);

  // Manejar agregar o quitar favoritos
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddFavorite = (pokemon) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === pokemon.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, pokemon];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (pokemonToRemove) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== pokemonToRemove.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage pokemons={pokemons} onAddFavorite={handleAddFavorite} />
            }
          />
          <Route
            path="/pokemon/:id"
            element={<PokemonDetails pokemons={pokemons} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;