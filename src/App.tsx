import { css, Global } from '@emotion/react'
import { faCodeBranch, faFloppyDisk, faGlasses } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

import { Header } from './components/header'
import { Loading } from './components/loading'
import { NotSupported } from './components/notSupported'
import { Preview } from './components/preview'
import { Settings } from './components/settings'
import { Uploader } from './components/uploader'
import { Validator } from './components/validator'
import { Viewer } from './components/viewer'
import { Data, Field } from './types/ocr'
import colors from './utils/colors'
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
  index: 0,
  id: '',
  image: '',
}

function App() {
  const [notSupportedSize, setNotSupportedSize] = useState(false)
  const [images, setImages] = useState<Data[]>([])
  const [fields, setFields] = useState<Field[]>(fieldsInitialState)
  const [selectedImage, setSelectedImage] = useState<Data>(selectedInitialState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { innerWidth } = window
    if (innerWidth <= 1000) setNotSupportedSize(true)
  }, [])

  const handleChange = async (values: Data[]) => {
    setImages(values)
    setSelectedImage(values[0])
  }

  const handleClick = async () => {
    if (!images.length) return
    setLoading(true)
    const ocr = await readAll(images, fields)
    setImages(ocr)
    setSelectedImage(ocr[0])
    setLoading(false)
  }

  const handleSelectImageFromPreview = (index: number) => {
    const selected = images[index]
    if (!selected) return
    setSelectedImage(selected)
  }

  const handleValidationFormChange = (data: Data) => {
    let model = [...images]
    model[data.index] = data
    setImages(model)
    setSelectedImage(data)
  }

  return (
    <>
      <Loading isLoading={loading} />
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
            selected={selectedImage.id}
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
    background-color: ${colors.black};
    font-family: 'Alfa Slab One', sans-serif;
    color: ${colors.white};
  }
  a {
    color: ${colors.black};
  }
  a:hover {
    color: ${colors.red};
  }
  input {
    font-size: 1.1em;
  }
  button {
    background-color: transparent;
    border-width: 0;
    padding: 0;
  }
`

export default App
