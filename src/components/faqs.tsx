import { css } from '@emotion/react'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { Modal } from './modal'

export function Faqs() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <FontAwesomeIcon
        css={css`
          cursor: pointer;
          &:hover {
            color: #d03501;
          }
        `}
        icon={faQuestion}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <h1>This is Modal Content!</h1>
        </Modal>
      )}
    </>
  )
}
