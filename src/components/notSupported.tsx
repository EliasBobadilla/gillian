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
        height: 55%;
        padding: 20px 15px 0 15px;
        color: ${colors.black};
        border-radius: 5px;

        img {
          margin-top: 30px;
          height: auto;
          width: 95%;
        }
      `}
    >
      <span>
        This screen size is not supported, use at least a 15" monitor to enjoy the Gillian
        OCR's full experience
      </span>
      <img alt="birdgirl" src={birdgirl} />
    </div>
  )
}
