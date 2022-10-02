import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

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

  const [randomId, setRandomId] = useState(0);

  const getRandomNumber = () => parseInt(Math.random() * characters.length + 1);

  if (detailPage || randomPage) {
    characterId = parseInt(characterId);
    displayCharacters = characters.filter(
      (character) => character.id === (randomPage ? randomId : characterId)
    );
  }

  if (favoritesPage) {
    displayCharacters = characters.filter((character) =>
      bookmarks.find((bookmark) => bookmark === character.id)
    );
  }

  return (
    <CardList randomPage={randomPage}>
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
      {randomPage && randomId === 0 && (
        <QuestionMark>
          <FontAwesomeIcon icon={solid("question")} size="10x" />
        </QuestionMark>
      )}
      {randomPage && (
        <RandomizeButton onClick={() => setRandomId(getRandomNumber())}>
          Get random character
        </RandomizeButton>
      )}
    </CardList>
  );
}

const CardList = styled.ul`
  display: flex;
  flex-direction: ${({ randomPage }) => (randomPage ? "column" : "row")};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const QuestionMark = styled.span`
  display: flex;
  justify-content: center;
`;

const RandomizeButton = styled.button`
  border: 2px solid black;
  padding: 1em;
  font-size: 1.2rem;
`;
