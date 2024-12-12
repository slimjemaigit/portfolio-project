import React from 'react';

interface CharacterCardProps {
  name: string;
  age: number;
  house: string;
  imageFilename: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, age, house, imageFilename }) => {
  const imageUrl = `/images/${imageFilename}`;

  return (
    <div className="character-card">
      <img src={imageUrl} alt={name} />
      <div className="character-info">
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>House: {house}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
