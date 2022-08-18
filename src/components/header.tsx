import { css } from '@emotion/react'

import birdgirl from '../assets/birdgirl.webp'
import gillian from '../assets/gillian-birdgirl.webp'
import colors from '../utils/colors'

type Prop = {
  children: JSX.Element[]
}

export function Header({ children }: Prop) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 100px;
        background-color: ${colors.yellow};
        color: ${colors.black};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: row;
          gap: 20px;
          img {
            max-width: 100px;
            height: auto;
          }
          span {
            font-size: 60px;
          }
        `}
      >
        <img alt="gillian-birdgirl" src={gillian} />
        <span>Gillian</span>
      </div>

      <img
        css={css`
          height: 100px;
          width: auto;
        `}
        alt="birdgirl"
        src={birdgirl}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: row;
          gap: 30px;
          margin-right: 50px;
          svg {
            height: 40px;
            width: auto;
          }
        `}
      >
        {children}
      </div>
    </div>
  )
}
