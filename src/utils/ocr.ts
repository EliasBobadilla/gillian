import { createWorker } from 'tesseract.js'

import { Data, Field, Log } from '../types/ocr'

// eslint-disable-next-line no-unused-vars
type Callback = (message: Log) => void

async function recognize(img: Data, fields: Field[], callback: Callback): Promise<Data> {
  const worker = createWorker({
    logger: (m) => callback({ id: img.id, progress: m.progress || 0 }),
  })

  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')

  const { data } = await worker.recognize(img.image)
  await worker.terminate()

  const words = data.words.filter((word) =>
    fields.some((y) => word.text.includes(y.anchor)),
  )
  return { ...img, ocr: words.map((x) => ({ box: x.bbox, text: x.line.text })) }
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
