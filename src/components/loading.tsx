import { css, keyframes } from '@emotion/react'

import colors from '../utils/colors'
const animation = keyframes`
    from, 0%, to {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
`
type Prop = {
  children: JSX.Element[]
  isLoading: boolean
}

export function Loading({ children, isLoading }: Prop) {
  return (
    <div>
      {isLoading && (
        <div
          css={css`
            width: 100vw;
            height: 100vh;
            position: fixed;
            inset: 0;
            background-color: ${colors.yellow7};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-in-out;
            overflow: hidden;
            z-index: 9999;

            &:after {
              content: ' ';
              display: block;
              border-radius: 50%;
              width: 0;
              height: 0;
              margin: 8px;
              box-sizing: border-box;
              border: 32px solid #000;
              border-color: #000 transparent #000 transparent;
              animation: ${animation} 1.2s infinite;
            }
          `}
        />
      )}
      {children}
    </div>
  )
}
