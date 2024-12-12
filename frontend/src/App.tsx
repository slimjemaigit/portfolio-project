import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from './components/CharacterCard';
import './App.css';

interface Character {
  id: number;
  name: string;
  age: number;
  house: string;
  imageFilename: string;
}

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/characters');
        // Add the image filenames here
        const charactersWithImages = response.data.map((character: Character) => ({
          ...character,
          imageFilename: `${character.name.toLowerCase().replace(' ', '_')}.jpg`
        }));
        setCharacters(charactersWithImages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Game of Thrones Characters</h1>
      <div className="character-list">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            name={character.name}
            age={character.age}
            house={character.house}
            imageFilename={character.imageFilename}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
