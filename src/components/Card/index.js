import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Card({
  character,
  toggleBookmark,
  bookmarked,
  detailPage,
}) {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <CardItem>
      <CharacterPicture src={character.image} alt={character.name} />
      <CharacterName>{character.name}</CharacterName>
      {!detailPage && (
        <Link to={`/details/${character.id}`}>
          <ShowButton>Show more</ShowButton>
        </Link>
      )}
      {detailPage && showDetails && (
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
      {detailPage && !showDetails && (
        <ShowButton onClick={() => setShowDetails(true)}>
          Show details
        </ShowButton>
      )}
      <Bookmark onClick={toggleBookmark} bookmarked={bookmarked} />
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
  position: relative;
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

const Bookmark = styled.button`
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  width: 2rem;
  height: 2rem;
  border: 2px solid black;
  background-color: rgba(
    0,
    0,
    0,
    ${({ bookmarked }) => (bookmarked ? "1" : "0.2")}
  );
  border-radius: 50%;
`;
