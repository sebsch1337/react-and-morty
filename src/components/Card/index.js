import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

export default function Card({ character, characters }) {
  const [showDetails, setShowDetails] = useState(true);
  let { characterId } = useParams();

  if (characterId) {
    characterId = parseInt(characterId);
    if (characters.length === 0) return <p>Loading...</p>;

    const filteredCharacter = characters.filter(
      (character) => character.id === characterId
    );
    character = { ...filteredCharacter[0] };
  }

  return (
    <CardItem>
      <CharacterPicture src={character.image} alt={character.name} />
      <CharacterName>{character.name}</CharacterName>
      {!characterId && (
        <Link to={`/details/${character.id}`}>
          <ShowButton>Show more</ShowButton>
        </Link>
      )}
      {characterId && showDetails && (
        <>
          <CharacterDetail>Status: {character.status}</CharacterDetail>
          <CharacterDetail>Species: {character.species}</CharacterDetail>
          <CharacterDetail>Gender: {character.gender}</CharacterDetail>
          <CharacterDetail>Origin: {character.origin.name}</CharacterDetail>
          <CharacterDetail>Location: {character.location.name}</CharacterDetail>
          <ShowButton onClick={() => setShowDetails(false)}>
            Show less
          </ShowButton>
        </>
      )}
      {characterId && !showDetails && (
        <ShowButton onClick={() => setShowDetails(true)}>
          Show details
        </ShowButton>
      )}
    </CardItem>
  );
}

const CardItem = styled.li`
  list-style: none;
  border-radius: 0.5rem;
  background-color: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgb(0 0 0) 0px 0px 8px 0px;
`;

const CharacterPicture = styled.img`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const CharacterName = styled.h2`
  margin-top: 1rem;
  text-align: center;
`;

const CharacterDetail = styled.p`
  padding: 0.5rem;
`;

const ShowButton = styled.button`
  margin: 1rem 0;
  width: 10rem;
  height: 3rem;
  font-size: 1.2em;
  border: none;
`;
