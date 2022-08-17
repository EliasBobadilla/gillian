import { createWorker } from 'tesseract.js'

import { Data, Field, Log, Ocr } from '../types/ocr'

// eslint-disable-next-line no-unused-vars
type Callback = (message: Log) => void

export function cleanOcr(field: Field, text: string) {
  const index = text.indexOf(field.anchor)
  let value = text.substring(index, text.length).replace(field.anchor, '')

  switch (field.type) {
    case 'date':
      value = value.replace(/[^0-9/-]/g, '')
      break
    default:
      value = value.replace(/[^a-zA-Z ]/g, '')
      break
  }

  return value
}

async function recognize(img: Data, fields: Field[], callback: Callback): Promise<Data> {
  const worker = createWorker({
    logger: (m) => callback({ id: img.id, progress: m.progress || 0 }),
  })

  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')

  const { data } = await worker.recognize(img.image)
  await worker.terminate()

  const words = data.words.map((word) => {
    const field = fields.find((y) => word.text.includes(y.anchor))
    if (!field) return undefined
    return { box: word.bbox, text: cleanOcr(field, word.line.text), field: field } as Ocr
  })

  return { ...img, ocr: words.filter((word) => word) }
}

export async function readAll(
  images: Data[],
  fields: Field[],
  callback?: Callback,
): Promise<Data[]> {
  if (!callback) {
    callback = (message) => {
      console.log(message)
    }
  }
  return Promise.all(
    images.map(async (image) => {
      return recognize(image, fields, callback!)
    }),
  )
}
