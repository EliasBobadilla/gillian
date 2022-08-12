import { css } from '@emotion/react'
import React, { useState } from 'react'

import { Field, Image } from '../types/ocr'
import { getBase64 } from '../utils/image'
import { readAll } from '../utils/ocr'
import { Preview } from './preview'
import { Viewer } from './viewer'

const demoFields: Field[] = [
  {
    name: 'Fecha de solicitud',
    type: 'date',
    anchor: 'Solicitud',
  },
  {
    name: 'Paciente',
    type: 'text',
    anchor: 'Paciente',
  },
]

const selectedInitialState: Image = {
  id: '',
  image: '',
}

function Reader() {
  const [images, setImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<Image>(selectedInitialState)

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
    console.log('=================>', selected)
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
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
      <Viewer image={selectedImage?.image!} />
    </div>
  )
}

export default Reader
