import { css } from '@emotion/react'

import colors from './colors'

export const globalstyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.black};
    font-family: 'Alfa Slab One', sans-serif;
    color: ${colors.white};
  }
  a {
    color: ${colors.black};
  }
  a:hover {
    color: ${colors.red};
  }
  input {
    font-size: 1.1em;
  }
  button {
    background-color: transparent;
    border-width: 0;
    padding: 0;
  }
`
