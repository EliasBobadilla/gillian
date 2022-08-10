import { createWorker } from 'tesseract.js'

import { Field, Image, Log, Ocr } from '../types/ocr'

// eslint-disable-next-line no-unused-vars
type Callback = (message: Log) => void

async function recognize(
  image: Image,
  fields: Field[],
  callback: Callback,
): Promise<Ocr> {
  const worker = createWorker({
    logger: (m) => callback({ id: image.name, progress: m.progress || 0 }),
  })

  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')

  const { data } = await worker.recognize(image.url)
  await worker.terminate()

  const words = data.words.filter((word) =>
    fields.some((y) => word.text.includes(y.anchor)),
  )
  return { id: image.name, image: image.url, words }
}

export async function readAll(
  images: Image[],
  fields: Field[],
  callback?: Callback,
): Promise<Ocr[]> {
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
