import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "../Card";

export default function CardWrapper({
  characters,
  bookmarks,
  toggleBookmark,
  detailPage = false,
}) {
  let { characterId } = useParams();
  let displayCharacters = characters;
  if (detailPage) {
    characterId = parseInt(characterId);
    console.log(characters);
    displayCharacters = characters.filter(
      (character) => character.id === characterId
    );
  }

  return (
    <CardList>
      {displayCharacters.map((character) => (
        <Card
          key={character.id}
          character={character}
          toggleBookmark={() => toggleBookmark(character.id)}
          bookmarked={bookmarks.some(
            (bookmarkId) => bookmarkId === character.id
          )}
          detailPage={detailPage}
        />
      ))}
    </CardList>
  );
}

const CardList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
