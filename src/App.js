import { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Card from "./components/Card";
import CardDetails from "./components/CardDetails";

function App() {
  const [characters, setCharacters] = useState([]);

  async function fetchData(URL) {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCharacters(data.results);
      return data.results;
    } catch {
      console.error("Can't fetch data from " + URL);
    }
  }

  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  return (
    <div>
      <Header>
        <h1>React And Morty</h1>
      </Header>
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <CardList>
                {characters.map((character) => (
                  <Card key={character.id} character={character} />
                ))}
              </CardList>
            }
          />
          <Route
            path="/details/:characterId"
            element={
              <CardList>
                <CardDetails characters={characters} />
              </CardList>
            }
          />
        </Routes>
      </Main>
      <Footer>
        <NavBar>
          <NavItem>Placeholder</NavItem>
          <NavItem>Placeholder</NavItem>
          <NavItem>Placeholder</NavItem>
          <NavItem>Placeholder</NavItem>
        </NavBar>
      </Footer>
    </div>
  );
}

export default App;

const Header = styled.header`
  position: sticky;
  height: 4em;
  background-color: hotpink;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 1em;
  margin-bottom: 4em;
`;

const CardList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  background-color: hotpink;
  height: 4em;
  width: 100%;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
`;

const NavItem = styled.button`
  width: 100%;
  background-color: transparent;
  border: 0;
  font-size: 1.2rem;
`;
