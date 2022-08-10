import React, { useEffect, useRef, useState } from 'react'

import { Field, Image, Ocr } from '../types/ocr'
import { readAll } from '../utils/ocr'
import { Preview } from './preview'

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
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

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '')
      ref.current.setAttribute('webkitdirectory', '')
    }
  }, [ref])

  return (
    <div>
      <input type="file" onChange={handleChange} ref={ref} />
      <button onClick={handleClick}>Convert to text</button>
      <button
        onClick={() => {
          console.log(results)
        }}
      >
        Results!
      </button>
      {images.map((img, i) => (
        <Preview key={i} title={img.name} image={img.url} />
      ))}
    </div>
  )
}

export default Reader
