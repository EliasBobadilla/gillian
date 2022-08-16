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
        border: 0;
        border-radius: 5px;
        padding: 10px;
        background: ${active ? '#d03501;' : '#fff'};
      `}
      onClick={() => onSelect(title)}
    >
      <FontAwesomeIcon
        css={css`
          height: 64px;
          width: auto;
          color: ${active ? '#fff;' : '#000'};
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
          color: ${active ? '#fff;' : '#000'};
        `}
      >
        {title}
      </span>
    </button>
  )
}
