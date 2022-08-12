import { Word } from 'tesseract.js'

export type Log = {
  id: string
  progress: number
}

export type Field = {
  name: string
  type: string
  anchor: string
}

export type Image = {
  id: string
  image: string
  words?: Word[]
}
