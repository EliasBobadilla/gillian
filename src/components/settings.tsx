import { css } from '@emotion/react'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { Modal } from './modal'

const fieldsInitialState: Field[] = [
  {
    label: 'Fecha de solicitud',
    name: 'applicationDate',
    type: 'date',
    anchor: 'Solicitud',
  },
  {
    label: 'Paciente',
    name: 'patient',
    type: 'text',
    anchor: 'Paciente',
  },
]

export function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <FontAwesomeIcon
        css={css`
          cursor: pointer;
        `}
        icon={faGear}
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
