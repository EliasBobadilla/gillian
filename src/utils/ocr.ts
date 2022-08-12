import { createWorker } from 'tesseract.js'

import { Field, Image, Log } from '../types/ocr'

// eslint-disable-next-line no-unused-vars
type Callback = (message: Log) => void

async function recognize(
  img: Image,
  fields: Field[],
  callback: Callback,
): Promise<Image> {
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
  return { ...img, words }
}

export async function readAll(
  images: Image[],
  fields: Field[],
  callback?: Callback,
): Promise<Image[]> {
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
