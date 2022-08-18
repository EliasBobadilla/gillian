import { css } from '@emotion/react'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import colors from '../utils/colors'

type Prop = {
  title: string
  position: number
  active?: boolean
  onSelect: (id: number) => void
}

export function Thumb({ title, position, active, onSelect }: Prop) {
  return (
    <button
      css={css`
        display: flex;
        flex-direction: column;
        border: 0;
        border-radius: 5px;
        padding: 10px;
        background: ${active ? colors.red : colors.white};
      `}
      onClick={() => onSelect(position)}
    >
      <FontAwesomeIcon
        css={css`
          height: 64px;
          width: auto;
          color: ${active ? colors.white : colors.black};
        `}
        icon={faFileInvoice}
      />
      <span
        css={css`
          margin-top: 10px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: ${active ? colors.white : colors.black};
        `}
      >
        {title}
      </span>
    </button>
  )
}
