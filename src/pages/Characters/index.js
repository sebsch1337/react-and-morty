import styled from "styled-components";

import Card from "../../components/Card";

let nextPage = 2;

export default function Characters({
  characters,
  bookmarks,
  toggleBookmark,
  fetchNextPage,
  apiUrl,
  charactersInfo,
}) {
  return (
    <>
      {characters.map((character) => (
        <Card
          key={character.id}
          character={character}
          toggleBookmark={() => toggleBookmark(character.id)}
          bookmarked={bookmarks.some((bookmarkId) => bookmarkId === character.id)}
        />
      ))}
      {characters.length > 0 && (
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

const GiveMeMoreWrapper = styled.div`
  width: 100%;
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
