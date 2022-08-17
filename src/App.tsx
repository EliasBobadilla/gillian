import { css, Global } from '@emotion/react'
import { faCodeBranch, faFloppyDisk, faGlasses } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import { Header } from './components/header'
import { NotSupported } from './components/notSupported'
import { Preview } from './components/preview'
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
  const [notSupportedSize, setNotSupportedSize] = useState(false)
  const [images, setImages] = useState<Data[]>([])
  const [fields, setFields] = useState<Field[]>(fieldsInitialState)
  const [selectedImage, setSelectedImage] = useState<Data>(selectedInitialState)

  useEffect(() => {
    const { innerWidth } = window
    if (innerWidth <= 1000) setNotSupportedSize(true)
    console.log('-------', innerWidth)
  }, [])

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
      <Global styles={globalstyles} />
      {notSupportedSize && <NotSupported />}
      <Header>
        <Settings fields={fields} onSave={setFields} />
        <Uploader onUpload={handleChange} />
        <a href="#">
          <FontAwesomeIcon icon={faGlasses} onClick={handleClick} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faFloppyDisk} onClick={handleClick} />
        </a>
        <a href="https://github.com/EliasBobadilla/gillian" target="blank">
          <FontAwesomeIcon icon={faCodeBranch} />
        </a>
      </Header>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          height: 100%;
          width: 100%;
        `}
      >
        {images.length > 0 && (
          <Preview
            images={images}
            onSelect={handleSelectImageFromPreview}
            selected={selectedImage}
          />
        )}

        {images.length > 0 && <Viewer data={selectedImage} />}

        {images[0]?.ocr && (
          <Validator
            data={selectedImage}
            fields={fields}
            onChange={handleValidationFormChange}
          />
        )}
      </div>
    </>
  )
}

const globalstyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    font-family: 'Alfa Slab One', sans-serif;
    color: #fff;
  }
  a {
    color: #000;
  }
  a:hover {
    color: #d03501;
  }
`

export default App
