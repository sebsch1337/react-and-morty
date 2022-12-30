import { useParams } from "react-router-dom";

import Card from "../../components/Card";

export default function Details({ characters }) {
  let { characterId } = useParams();
  characterId = parseInt(characterId);

  return [characters.find(({ id }) => id === characterId)].map((character) => (
    <Card key={character.id} character={character} detailPage={true} />
  ));
}
