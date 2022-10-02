import { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import CardWrapper from "./components/CardWrapper";
import { useLocalStorage } from "./hooks";

function App() {
  const [characters, setCharacters] = useState([]);
  const [bookmarks, setBookmarks] = useLocalStorage("r-a-m-bookmarks", []);

  useEffect(() => {
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
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  function toggleBookmark(id) {
    bookmarks.find((bookmarkId) => bookmarkId === id)
      ? setBookmarks((bookmarks) =>
          bookmarks.filter((bookmark) => bookmark !== id)
        )
      : setBookmarks((bookmarks) => [...bookmarks, id]);
  }

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
              <CardWrapper
                characters={characters}
                setCharacters={setCharacters}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
              />
            }
          />
          <Route
            path="/details/:characterId"
            element={
              <CardWrapper
                characters={characters}
                setCharacters={setCharacters}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                detailPage={true}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <CardWrapper
                characters={characters}
                setCharacters={setCharacters}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                favoritesPage={true}
              />
            }
          />
        </Routes>
      </Main>
      <Footer>
        <NavBar>
          <NavButton to="/" end>
            <FontAwesomeIcon icon={solid("house")} />
          </NavButton>

          <NavButton to="/favorites">
            <FontAwesomeIcon icon={solid("bookmark")} />
          </NavButton>

          <NavButton to="">...</NavButton>
          <NavButton to="">...</NavButton>
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

const NavButton = styled(NavLink)`
  width: 100%;
  background-color: transparent;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  font-size: 1.2rem;
`;
