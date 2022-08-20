import { css } from '@emotion/react'

import birdgirl from '../assets/birdgirl.webp'
import colors from '../utils/colors'
export function NotSupported() {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: ${colors.yellow};
        font-size: 2em;
        text-align: center;
        max-width: 80%;
        height: 48%;
        padding: 19px;
        color: ${colors.black};
        border-radius: 5px;

        img {
          margin-top: 30px;
        }
      `}
    >
      <span>
        This screen size is not supported, use at least a 15" monitor to enjoy the Gillian
        OCR's full experience
      </span>
      <img
        css={css`
          height: 100px;
          width: auto;
        `}
        alt="birdgirl"
        src={birdgirl}
      />
    </div>
  )
}
