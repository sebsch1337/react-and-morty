import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Card({ character }) {
  return (
    <CardItem>
      <CharacterPicture src={character.image} alt={character.name} />
      <CharacterName>{character.name}</CharacterName>
      <Link to={`/details/${character.id}`}>
        <ShowButton>Show more</ShowButton>
      </Link>
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

const ShowButton = styled.button`
  margin: 1rem 0;
  width: 10rem;
  height: 3rem;
  font-size: 1.2em;
  border: none;
`;
