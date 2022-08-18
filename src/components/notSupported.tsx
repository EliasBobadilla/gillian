import { css } from '@emotion/react'

import colors from '../utils/colors'
export function NotSupported() {
  return (
    <div
      css={css`
        padding: 50px;
        background-color: ${colors.red};
        font-size: 2em;
        text-align: center;
      `}
    >
      This screen size is not supported, use at least a 15" monitor to get this app's full
      experience
    </div>
  )
}
