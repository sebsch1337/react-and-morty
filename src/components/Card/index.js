import styled from "styled-components";

export default function Card({ character }) {
  return (
    <CardItem>
      <Picture src={character.image} alt={character.name} />
      <Name>{character.name}</Name>
      <ShowButton>Show more</ShowButton>
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

const Picture = styled.img`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const Name = styled.h2`
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
