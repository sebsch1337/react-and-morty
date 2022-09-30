import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function CardList ({characters}) {
    let { characterId } = useParams();
    characterId = parseInt(characterId);
    

return ();
}

const CardList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;