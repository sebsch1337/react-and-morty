import { useState } from "react";

export async function fetchCharacters() {
  const URL = "https://rickandmortyapi.com/api/character";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return JSON.stringify(data.results);
  } catch {
    console.error("Can't fetch data from " + URL);
  }
}

export async function useLocalStorage(initialValue, key = "react-and-morty") {
  const [characters, setCharacters] = useState(() => {
    const data = JSON.parse(localStorage.getItem(key) ?? fetchCharacters());
    console.log(data);
    return data;
  });

  return [characters, setCharacters];
}
