import { css } from '@emotion/react'
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
import { buildCSV } from './utils/data'
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

  const handleOnUpload = async (values: Data[]) => {
    setImages(values)
    setSelectedImage(values[0])
  }

  const handleOnRead = async () => {
    if (!images.length) return
    setLoading(true)
    const ocr = await readAll(images, fields)
    setImages(ocr)
    setSelectedImage(ocr[0])
    setLoading(false)
  }

  const handleOnSelectImage = (index: number) => {
    const selected = images[index]
    if (!selected) return
    setSelectedImage(selected)
  }

  const handleOnFormChange = (data: Data) => {
    const model = [...images]
    model[data.index] = data
    setImages(model)
    setSelectedImage(data)
  }

  const handleOnSave = async () => {
    buildCSV(images)
  }

  return notSupportedSize ? (
    <NotSupported />
  ) : (
    <Loading isLoading={loading}>
      <Header>
        <Settings id="gtm-gillian-settings" fields={fields} onSave={setFields} />
        <Uploader id="gtm-gillian-uploader" onUpload={handleOnUpload} />
        <a id="gtm-gillian-read" href="#">
          <FontAwesomeIcon icon={faGlasses} onClick={handleOnRead} />
        </a>
        <a id="gtm-gillian-save" href="#">
          <FontAwesomeIcon icon={faFloppyDisk} onClick={handleOnSave} />
        </a>
        <a
          id="gtm-gillian-github2"
          href="https://github.com/EliasBobadilla/gillian"
          target="blank"
        >
          <FontAwesomeIcon id="gtm-gillian-github" icon={faCodeBranch} />
        </a>
      </Header>
      <main
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
            onSelect={handleOnSelectImage}
            selected={selectedImage.id}
          />
        )}

        {images.length > 0 && <Viewer data={selectedImage} />}

        {images[0]?.ocr && (
          <Validator data={selectedImage} fields={fields} onChange={handleOnFormChange} />
        )}
      </main>
    </Loading>
  )
}

export default App
