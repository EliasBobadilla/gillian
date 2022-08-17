import { css } from '@emotion/react'

export function NotSupported() {
  return (
    <div
      css={css`
        padding: 50px;
        background-color: #d03501;
        font-size: 2em;
        text-align: center;
      `}
    >
      This screen size is not supported, use at least a 15" monitor to get this app's full
      experience
    </div>
  )
}
