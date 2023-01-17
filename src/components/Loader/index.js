import styled, { keyframes } from "styled-components";
import planetPng from "../../img/planet.png";

export default function Loader() {
  return (
    <LoaderWrapper>
      <PlanetImg src={planetPng} />
      <LoadingText>Loading ...</LoadingText>
    </LoaderWrapper>
  );
}

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
`;

const LoadingText = styled.p`
  font-family: "Permanent Marker";
  font-size: 2rem;
  color: var(--secondary-color);
`;

const rotate = keyframes`
0% { transform: rotate(0);}
100% { transform: rotate(359deg);}
`;

const PlanetImg = styled.img`
  width: 50%;
  animation: ${rotate} 4s infinite linear;
`;
