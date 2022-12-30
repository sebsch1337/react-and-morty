import styled from "styled-components";

import Card from "../../components/Card";

export default function Favorites({ characters, bookmarks, toggleBookmark }) {
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
      {characters.length === 0 && <Info>Go back and get some bookmarks!</Info>}
    </>
  );
}

const Info = styled.p`
  color: var(--primary-color);
`;
