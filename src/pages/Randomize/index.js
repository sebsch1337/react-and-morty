import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import Card from "../../components/Card";

export default function Randomize({ bookmarks, toggleBookmark, getRandomCharacter, randomCharacter }) {
  return (
    <RandomizeWrapper>
      {randomCharacter.length === 0 ? (
        <QuestionMark>
          <FontAwesomeIcon icon={solid("question")} size="10x" />
        </QuestionMark>
      ) : (
        <Card
          key={randomCharacter.id}
          character={randomCharacter}
          toggleBookmark={() => toggleBookmark(randomCharacter.id)}
          bookmarked={bookmarks.some((bookmarkId) => bookmarkId === randomCharacter.id)}
        />
      )}
      <RandomizeButton onClick={() => getRandomCharacter()}>Get random character</RandomizeButton>
    </RandomizeWrapper>
  );
}

const RandomizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
