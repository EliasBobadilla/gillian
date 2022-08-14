import { css, Global } from '@emotion/react'

import Reader from './components/reader'

function App() {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #000;
            font-family: 'Alfa Slab One', sans-serif;
          }
        `}
      />
      <Reader />
    </>
  )
}

export default App
