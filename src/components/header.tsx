import { css } from '@emotion/react'
import { faBook, faGear, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import birdgirl from '../assets/birdgirl.webp'
import gillian from '../assets/gillian-birdgirl.webp'
import { Settings } from './settings'

export function Header() {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        height: 100px;
        background-color: #f6cb00;
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
          margin-right: 200px;
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
          gap: 25px;
          margin-right: 50px;
          svg {
            height: 40px;
            width: auto;
          }
        `}
      >
        <Settings />
        <FontAwesomeIcon icon={faBook} />
        <FontAwesomeIcon icon={faQuestion} />
      </div>
    </div>
  )
}
