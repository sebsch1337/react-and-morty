import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

export default function Details({ character = {}, setSingleCharacter }) {
  let { characterId } = useParams();
  characterId = parseInt(characterId);

  useEffect(() => {
    if (characterId) {
      setSingleCharacter(characterId);
    }
  }, [characterId]);

  return character.id === characterId ? (
    <Card key={character.id} character={character} detailPage={true} />
  ) : (
    <Loader />
  );
}
