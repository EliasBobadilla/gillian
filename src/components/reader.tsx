import { css } from '@emotion/react'
import React, { useState } from 'react'

import { Data, Field } from '../types/ocr'
import { getBase64 } from '../utils/image'
import { readAll } from '../utils/ocr'
import { Header } from './header'
import { Preview } from './preview'
import { Validator } from './validator'
import { Viewer } from './viewer'

// TODO: remove
const demoFields: Field[] = [
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

const selectedInitialState: Data = {
  id: '',
  image: '',
}

function Reader() {
  const [images, setImages] = useState<Data[]>([])
  const [selectedImage, setSelectedImage] = useState<Data>(selectedInitialState)

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

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!fileValidation(files)) return

    const loadedImages = await Promise.all(
      [...files!].map(async (file: File) => ({
        id: file.name,
        image: await getBase64(file),
      })),
    )
    setImages(loadedImages)
    setSelectedImage(loadedImages[0])
  }

  const handleClick = async () => {
    if (!images.length) return
    const ocr = await readAll(images, demoFields)
    console.log('OCR PROCESS END -------------->', ocr)
    setImages(ocr)
  }

  const handleSelectImageFromPreview = (id: string) => {
    const selected = images.find((x) => x.id === id)
    if (!selected) return
    setSelectedImage(selected)
    console.log('selected ------>', selected)
  }

  const handleValidationFormChange = (data: Data) => {
    console.log('changed ----->', data)
  }

  return (
    <div>
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          height: 100%;
          gap: 10px;
          width: 100%;
          margin: 0;
        `}
      >
        <div
          css={css`
            width: 10%;
          `}
        >
          <input type="file" onChange={handleChange} multiple />
          <button onClick={handleClick}>Convert to text</button>
          <button
            onClick={() => {
              console.log(images)
            }}
          ></button>
        </div>

        <Preview
          images={images}
          onSelect={handleSelectImageFromPreview}
          selected={selectedImage}
        />
        <Viewer data={selectedImage} />
        <Validator
          data={selectedImage}
          fields={demoFields}
          onChange={handleValidationFormChange}
        />
      </div>
    </div>
  )
}

export default Reader
