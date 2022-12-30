import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import Card from "../Card";

let nextPage = 2;

export default function CardWrapper({
  characters,
  bookmarkedCharacters,
  bookmarks,
  toggleBookmark,
  fetchNextPage,
  apiUrl,
  charactersInfo,
  detailPage = false,
  favoritesPage = false,
  randomPage = false,
  getSingleCharacter,
}) {
  let { characterId } = useParams();
  characterId = parseInt(characterId);

  const [randomCharacter, setRandomCharacter] = useState([]);

  const getRandomCharacter = async () => {
    setRandomCharacter([
      await getSingleCharacter(
        "https://rickandmortyapi.com/api/character/",
        parseInt(Math.random() * charactersInfo.count)
      ),
    ]);
  };

  let displayCharacters = characters;
  if (detailPage) {
    displayCharacters = [[...characters, ...bookmarkedCharacters].find(({ id }) => id === characterId)];
  } else if (randomPage) {
    displayCharacters = randomCharacter;
  }

  return (
    <>
      <CardList randomPage={randomPage}>
        {displayCharacters.map((character) => (
          <Card
            key={character.id}
            character={character}
            toggleBookmark={() => toggleBookmark(character.id)}
            bookmarked={bookmarks.some((bookmarkId) => bookmarkId === character.id)}
            detailPage={detailPage}
          />
        ))}
        {randomPage && randomCharacter.length === 0 && (
          <QuestionMark>
            <FontAwesomeIcon icon={solid("question")} size="10x" />
          </QuestionMark>
        )}
        {randomPage && (
          <RandomizeButton onClick={() => getRandomCharacter()}>Get random character</RandomizeButton>
        )}
        {favoritesPage && displayCharacters.length === 0 && <Info>Go back and get some bookmarks!</Info>}
      </CardList>
      {characters.length > 0 && !detailPage && !favoritesPage && !randomPage && (
        <GiveMeMoreWrapper>
          <GiveMeMoreButton
            onClick={() => fetchNextPage(apiUrl + "?page=" + nextPage++)}
            disabled={charactersInfo.pages + 1 === nextPage}
          >
            Give Me More
          </GiveMeMoreButton>
        </GiveMeMoreWrapper>
      )}
    </>
  );
}

const Info = styled.p`
  color: var(--primary-color);
`;

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
  margin: 5rem;
  color: var(--dark-color);
  filter: drop-shadow(0 0 0.5rem var(--primary-color));
`;

const RandomizeButton = styled.button`
  width: 20rem;
  justify-self: center;
  align-self: center;
  padding: 0.8rem;
  font-family: "Permanent Marker";
  font-size: 1.3rem;
  border: none;
  border-radius: 5rem;
  background-color: var(--secondary-color);
  filter: drop-shadow(0 0 0.25rem var(--secondary-color));
`;

const GiveMeMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const GiveMeMoreButton = styled.button`
  font-family: "Permanent Marker";
  font-weight: 200;
  margin: 0.5rem 0 1rem 0;
  width: 15rem;
  height: 3rem;
  font-size: 1.2em;
  border: none;
  border-radius: 5rem;
  background-color: var(--secondary-color);
  filter: drop-shadow(0 0 0.25rem var(--secondary-color));
`;
