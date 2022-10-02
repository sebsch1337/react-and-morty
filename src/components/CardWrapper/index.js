import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "../Card";

export default function CardWrapper({
  characters,
  bookmarks,
  toggleBookmark,
  detailPage = false,
  favoritesPage = false,
  randomPage = false,
}) {
  let { characterId } = useParams();
  let displayCharacters = characters;

  if (randomPage) {
    characterId = Math.random() * characters.length + 1;
  }

  if (detailPage || randomPage) {
    characterId = parseInt(characterId);
    displayCharacters = characters.filter(
      (character) => character.id === characterId
    );
  }

  if (favoritesPage) {
    console.log(characters, bookmarks);
    displayCharacters = characters.filter((character) =>
      bookmarks.find((bookmark) => bookmark === character.id)
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
