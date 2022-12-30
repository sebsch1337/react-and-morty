import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import LogoSvg from "./img/logo.svg";

import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks";

import { Routes, Route, NavLink } from "react-router-dom";

import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import Randomize from "./pages/Randomize";
import Details from "./pages/Details";
import Settings from "./pages/Settings";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState([]);
  const [charactersInfo, setCharactersInfo] = useState({});
  const [bookmarks, setBookmarks] = useLocalStorage("r-a-m-bookmarks", []);
  const [randomCharacter, setRandomCharacter] = useState([]);

  const apiUrl = "https://rickandmortyapi.com/api/character/";

  useEffect(() => {
    async function fetchFirstPage(URL) {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setCharacters(data.results);
        setCharactersInfo(data.info);
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
      fetchBookmarkedCharacters(apiUrl + "[" + bookmarks.join(",") + "]");
    } else {
      setBookmarkedCharacters([]);
    }
  }, [bookmarks]);

  async function getSingleCharacter(URL, id) {
    try {
      const response = await fetch(URL + id);
      const data = await response.json();
      return data;
    } catch {
      console.error("Can't fetch data from " + URL + id);
    }
  }

  async function getRandomCharacter() {
    setRandomCharacter(await getSingleCharacter(apiUrl, parseInt(Math.random() * charactersInfo.count)));
  }

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
        <CardList>
          <Routes>
            <Route
              path="/"
              element={
                <Characters
                  characters={characters}
                  bookmarks={bookmarks}
                  toggleBookmark={toggleBookmark}
                  fetchNextPage={fetchNextPage}
                  apiUrl={apiUrl}
                  charactersInfo={charactersInfo}
                />
              }
            />
            <Route
              path="/details/:characterId"
              element={<Details characters={[...characters, ...bookmarkedCharacters, randomCharacter]} />}
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  characters={bookmarkedCharacters}
                  bookmarks={bookmarks}
                  toggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/random"
              element={
                <Randomize
                  bookmarks={bookmarks}
                  toggleBookmark={toggleBookmark}
                  randomCharacter={randomCharacter}
                  getRandomCharacter={getRandomCharacter}
                />
              }
            />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </CardList>
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

          <NavButton to="/settings">
            <FontAwesomeIcon icon={solid("gear")} size="xl" />
          </NavButton>
        </NavBar>
      </Footer>
    </>
  );
}

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

const CardList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
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
