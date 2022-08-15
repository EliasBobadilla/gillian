import { css } from '@emotion/react'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import { Field } from '../types/ocr'
import { Modal } from './modal'

type Prop = {
  fields: Field[]
  onSave: (fields: Field[]) => void
}
export function Settings({ fields, onSave }: Prop) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFields, setCurrentFields] = useState<string>('')

  useEffect(() => {
    setCurrentFields(JSON.stringify(fields, null, 2))
  }, [fields])

  const save = () => {
    onSave(JSON.parse(currentFields))
    setIsOpen(false)
  }

  return (
    <>
      <FontAwesomeIcon
        css={css`
          cursor: pointer;
          &:hover {
            color: #d03501;
          }
        `}
        icon={faGear}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              color: #fff;
              width: 80%;
              gap: 20px;
            `}
          >
            <label
              css={css`
                display: flex;
                flex-direction: column;
                color: #fff;
                font-size: 1.3em;
                width: 100%;
                gap: 10px;
              `}
            >
              JSON fields data
              <textarea
                name="jsonFields"
                rows={25}
                cols={50}
                value={currentFields}
                onChange={(e) => setCurrentFields(e.target.value)}
              >
                {JSON.stringify(currentFields)}
              </textarea>
            </label>
            <button
              css={css`
                background-color: #f6cb00;
                border-width: 0;
                padding: 0;
                height: 50px;
                width: 150px;
                font-size: 1.2em;
                font-family: 'Alfa Slab One', sans-serif;
                border-radius: 0 20px 20px 0;
              `}
              onClick={save} //TODO validate json structure
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
