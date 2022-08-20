import { Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { globalstyles } from './utils/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={globalstyles} />
    <App />
  </React.StrictMode>,
)
