import { css, Global } from '@emotion/react'
import { useState } from 'react'

import { Faqs } from './components/faqs'
import { Header } from './components/header'
import { Preview } from './components/preview'
import { Reader } from './components/reader'
import { Settings } from './components/settings'
import { Uploader } from './components/uploader'
import { Validator } from './components/validator'
import { Viewer } from './components/viewer'
import { Data, Field } from './types/ocr'
import { readAll } from './utils/ocr'

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

const selectedInitialState: Data = {
  id: '',
  image: '',
}

function App() {
  const [images, setImages] = useState<Data[]>([])
  const [fields, setFields] = useState<Field[]>(fieldsInitialState)
  const [selectedImage, setSelectedImage] = useState<Data>(selectedInitialState)

  const handleChange = async (values: Data[]) => {
    setImages(values)
    setSelectedImage(values[0])
  }

  const handleClick = async () => {
    if (!images.length) return
    const ocr = await readAll(images, fields)
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
    <>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #000;
            font-family: 'Alfa Slab One', sans-serif;
            color: #fff;
          }
        `}
      />
      <div>
        <Header>
          <Settings fields={fields} onSave={setFields} />
          <Uploader onUpload={handleChange} />
          <Reader onRead={handleClick} />
          <Faqs />
        </Header>
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
          <Preview
            images={images}
            onSelect={handleSelectImageFromPreview}
            selected={selectedImage}
          />
          <Viewer data={selectedImage} />
          <Validator
            data={selectedImage}
            fields={fields}
            onChange={handleValidationFormChange}
          />
        </div>
      </div>
    </>
  )
}

export default App
