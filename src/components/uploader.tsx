import { css } from '@emotion/react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent } from 'react'

import { BaseElement } from '../types/element'
import { Data } from '../types/ocr'
import { getBase64 } from '../utils/data'

interface Prop extends BaseElement {
  onUpload: (values: Data[]) => void
}

export function Uploader({ onUpload, id }: Prop) {
  const fileValidation = (files: FileList | null) => {
    if (!files || !files.length) {
      console.error('Something is wrong') // TODO: create alert box
      return false
    }

    if (files.length > 5 * 5 * 10) {
      console.error('Max files limit') // TODO: create alert box
      return false
    }

    return true
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!fileValidation(files)) return

    const loadedImages = await Promise.all(
      [...files!].map(async (file: File, index: number) => ({
        id: file.name,
        image: await getBase64(file),
        index,
      })),
    )
    onUpload(loadedImages)
  }

  return (
    <a
      href="#"
      css={css`
        position: relative;
        overflow: hidden;
        input[type='file'] {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }
      `}
    >
      <input id={id} type="file" onChange={handleChange} multiple />
      <FontAwesomeIcon icon={faUpload} />
    </a>
  )
}
