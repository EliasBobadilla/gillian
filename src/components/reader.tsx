import { css } from '@emotion/react'
import { faGlasses } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Prop = {
  onRead: () => void
}

export function Reader({ onRead }: Prop) {
  return (
    <FontAwesomeIcon
      css={css`
        cursor: pointer;
        &:hover {
          color: #d03501;
        }
      `}
      icon={faGlasses}
      onClick={() => onRead()}
    />
  )
}
