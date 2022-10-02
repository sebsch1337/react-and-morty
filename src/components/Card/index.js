import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import bookmarkedSvg from "../../img/bookmarked.svg";
import bookmarkAddSvg from "../../img/bookmark_add.svg";

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
        <CharacterDetailSection>
          <CharacterDetailFull>
            <DetailTextFat>Status</DetailTextFat>
            <br />
            {character.status}
          </CharacterDetailFull>
          <CharacterDetailHalf>
            <DetailTextFat>Species</DetailTextFat>
            <br />
            {character.species}
          </CharacterDetailHalf>
          <CharacterDetailHalf>
            <DetailTextFat>Gender</DetailTextFat>
            <br />
            {character.gender}
          </CharacterDetailHalf>
          <CharacterDetailFull>
            <DetailTextFat>Origin</DetailTextFat>
            <br />
            {character.origin.name}
          </CharacterDetailFull>
          <CharacterDetailFull>
            <DetailTextFat>Location</DetailTextFat>
            <br />
            {character.location.name}
          </CharacterDetailFull>
          <ShowButton onClick={() => setShowDetails(false)}>
            Show less
          </ShowButton>
        </CharacterDetailSection>
      )}
      {detailPage && !showDetails && (
        <ShowButton onClick={() => setShowDetails(true)}>
          Show details
        </ShowButton>
      )}
      <Bookmark onClick={toggleBookmark} bookmarked={bookmarked}>
        <BookmarkImg
          src={bookmarked ? bookmarkedSvg : bookmarkAddSvg}
          alt="Bookmarks"
        />
      </Bookmark>
    </CardItem>
  );
}

const CharacterDetailSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
`;

const DetailTextFat = styled.span`
  font-weight: bold;
`;

const CardItem = styled.li`
  width: 15em;
  list-style: none;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--secondary-color) 0px 0px 8px 0px;
  position: relative;
`;

const CharacterPicture = styled.img`
  width: 15em;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const CharacterName = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 2.5em;
  font-family: "Permanent Marker";
  font-weight: 400;
  text-align: center;
  text-overflow: ellipsis;
  line-height: 0.9em;
`;

const CharacterDetailFull = styled.p`
  font-family: "Andika";
  font-weight: 200;
  overflow-wrap: break-word;
  text-align: left;
  padding: 0.2rem;
  width: 100%;
  font-size: 0.9rem;
`;

const CharacterDetailHalf = styled.p`
  font-family: "Andika";
  font-weight: 200;
  overflow-wrap: break-word;
  text-align: left;
  padding: 0.2rem;
  width: 50%;
  font-size: 0.9rem;
`;

const ShowButton = styled.button`
  font-family: "Permanent Marker";
  font-weight: 200;
  margin: 0.5rem 0 1rem 0;
  width: 10rem;
  height: 3rem;
  font-size: 1.2em;
  border: none;
  border-radius: 5rem;
  background-color: var(--secondary-color);
  filter: drop-shadow(0 0 0.25rem var(--secondary-color));
`;

const Bookmark = styled.button`
  position: absolute;
  top: -0.4em;
  right: -0.5em;
  border: 0;
  background-color: transparent;
`;

const BookmarkImg = styled.img``;
