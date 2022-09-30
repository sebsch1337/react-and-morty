import styled from "styled-components";

import Card from "./components/Card";

function App() {
  return (
    <div>
      <Header>
        <h1>React And Morty</h1>
      </Header>
      <Main>
        <CardList>
          <Card />
          <Card />
        </CardList>
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
