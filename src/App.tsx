import { css, Global } from '@emotion/react'

import Reader from './components/reader'

function App() {
  return (
    <div>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Reader />
    </div>
  )
}

export default App
