import { css } from '@emotion/react'
import React, { useState } from 'react'

import { Field, Image, Ocr } from '../types/ocr'
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

function Reader() {
  const [images, setImages] = useState<Image[]>([])
  const [results, setResults] = useState<Ocr[]>([])
  const [selectedImage, setSelectedImage] = useState<Ocr>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    console.log(files)
    if (!files || !files.length || files.length > 5 * 5 * 4) return
    setImages(
      [...files].map((file: File) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    )
  }

  const handleClick = async () => {
    if (!images.length) return
    const ocr = await readAll(images, demoFields)
    console.log('OCR RESULT -------->', ocr)
    setResults(ocr)
  }

  const handleSelectImageFromPreview = (id: string) => {
    const selected = results.find((x) => x.id === id)
    //const selected = images.find((x) => x.name === id)
    if (!selected) return
    setSelectedImage(selected)
    //setSelectedImage({ id: selected.name, image: selected.url, words: [] })
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
            console.log(results)
          }}
        ></button>
      </div>

      <Preview
        images={images}
        onSelect={handleSelectImageFromPreview}
        selected={selectedImage}
      />
      <Viewer image={selectedImage.image} />
    </div>
  )
}

export default Reader
