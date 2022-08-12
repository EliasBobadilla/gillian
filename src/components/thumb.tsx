import { css } from '@emotion/react'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Prop = {
  title: string
  active?: boolean
  onSelect: (id: string) => void
}

export function Thumb({ title, active, onSelect }: Prop) {
  return (
    <button
      css={css`
        display: flex;
        flex-direction: column;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px;
        background: ${active ? '#000' : '#fff'};
      `}
      onClick={() => onSelect(title)}
    >
      <FontAwesomeIcon
        css={css`
          height: 80px;
          width: auto;
        `}
        icon={faFileInvoice}
      />
      <span
        css={css`
          margin-top: 10px;
          font-weight: bold;
        `}
      >
        {title}
      </span>
    </button>
  )
}
