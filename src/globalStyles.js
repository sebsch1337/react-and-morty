import { createGlobalStyle } from "styled-components";

import permanentMarkerFontWoff2 from "./fonts/permanent-marker-v16-latin-regular.woff2";
import permanentMarkerFontWoff from "./fonts/permanent-marker-v16-latin-regular.woff";
import andikaFontWoff2 from "./fonts/andika-v22-latin-regular.woff2";
import andikaFontWoff from "./fonts/andika-v22-latin-regular.woff";

const GlobalStyle = createGlobalStyle`
:root {
  --primary-color: #02a7c2;
  --secondary-color: #99cd7c;
  --dark-color: #338941;
  --darker-color: #1c1c40;
}

/* permanent-marker-regular - latin */
@font-face {
  font-family: 'Permanent Marker';
  font-style: normal;
  font-weight: 400;
  src: local('Permanent Marker'),
       url(${permanentMarkerFontWoff2}) format('woff2'), /* Super Modern Browsers */
       url(${permanentMarkerFontWoff}) format('woff'); /* Modern Browsers */
}

/* andika-regular - latin */
@font-face {
  font-family: 'Andika';
  font-style: normal;
  font-weight: 400;
  src: local('Andika'),
       url(${andikaFontWoff2}) format('woff2'), /* Super Modern Browsers */
       url(${andikaFontWoff}) format('woff'); /* Modern Browsers */
}

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
  background-color: var(--darker-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export default GlobalStyle;
