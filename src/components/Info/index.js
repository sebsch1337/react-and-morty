import styled from "styled-components";

export default function Info({ children }) {
  return <InfoWrapper>{children}</InfoWrapper>;
}

const InfoWrapper = styled.p`
  color: var(--primary-color);
`;
