import { useEffect, useState } from "react";
import styled from "styled-components";

import { Routes, Route, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import CardWrapper from "./components/CardWrapper";
import { useLocalStorage } from "./hooks";

import LogoSvg from "./img/logo.svg";

function App() {
  const [characters, setCharacters] = useState([]);
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [bookmarks, setBookmarks] = useLocalStorage("r-a-m-bookmarks", []);

  const apiUrl = "https://rickandmortyapi.com/api/character/";

  useEffect(() => {
    async function fetchFirstPage(URL) {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setCharacters(data.results);
        setMaxPages(data.info.pages);
        return data.results;
      } catch {
        console.error("Can't fetch data from " + URL);
      }
    }
    fetchFirstPage(apiUrl);
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      async function fetchBookmarkedCharacters(URL) {
        try {
          const response = await fetch(URL);
          const data = await response.json();
          setBookmarkedCharacters(data);
          return data;
        } catch {
          console.error("Can't fetch data from " + URL);
        }
      }
      fetchBookmarkedCharacters("https://rickandmortyapi.com/api/character/[" + bookmarks.join(",") + "]");
    } else {
      setBookmarkedCharacters([]);
    }
  }, [bookmarks]);

  async function fetchNextPage(URL) {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      return data.results;
    } catch {
      console.error("Can't fetch data from " + URL);
    }
  }

  function toggleBookmark(id) {
    bookmarks.find((bookmarkId) => bookmarkId === id)
      ? setBookmarks((bookmarks) => bookmarks.filter((bookmark) => bookmark !== id))
      : setBookmarks((bookmarks) => [...bookmarks, id]);
  }

  return (
    <>
      <Header>
        <TitleImg src={LogoSvg} />
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
                fetchNextPage={fetchNextPage}
                apiUrl={apiUrl}
                maxPages={maxPages}
              />
            }
          />
          <Route
            path="/details/:characterId"
            element={
              <CardWrapper
                characters={characters}
                bookmarkedCharacters={bookmarkedCharacters}
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
                characters={bookmarkedCharacters}
                setCharacters={setCharacters}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                favoritesPage={true}
              />
            }
          />
          <Route
            path="/random"
            element={
              <CardWrapper
                characters={characters}
                setCharacters={setCharacters}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                randomPage={true}
              />
            }
          />
        </Routes>
      </Main>
      <Footer>
        <NavBar>
          <NavButton to="/" end>
            <FontAwesomeIcon icon={solid("house")} size="xl" />
          </NavButton>

          <NavButton to="/favorites">
            <FontAwesomeIcon icon={solid("paperclip")} size="xl" />
          </NavButton>

          <NavButton to="/random">
            <FontAwesomeIcon icon={solid("question")} size="xl" />
          </NavButton>

          <NavButton to="">
            <FontAwesomeIcon icon={solid("gear")} size="xl" />
          </NavButton>
        </NavBar>
      </Footer>
    </>
  );
}

export default App;

const Header = styled.header`
  position: sticky;
  top: 0;
  height: 4rem;
  background-color: var(--primary-color);
  filter: drop-shadow(0 0 0.25rem var(--secondary-color));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const TitleImg = styled.img`
  position: absolute;
  height: 95%;
  filter: drop-shadow(0 0 0.75rem var(--secondary-color));
`;

const Main = styled.main`
  padding: 1em;
  margin-bottom: 4em;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  height: 4em;
  width: 100%;
  background-color: var(--primary-color);
  filter: drop-shadow(0 0 0.25rem var(--secondary-color));
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

  &.active {
    filter: drop-shadow(0 0 0.25rem var(--secondary-color));
  }

  &:hover {
    filter: drop-shadow(0 0 0.25rem var(--secondary-color));
  }
`;
