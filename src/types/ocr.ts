export type Field = {
  label: string
  name: string
  type: string
  anchor: string
}

export type Ocr = {
  text: string
  field: Field
  index: number
  box: {
    x0: number
    y0: number
    x1: number
    y1: number
  }
}

export type Data = {
  index: number
  id: string
  image: string
  ocr?: Ocr[]
}

export type Log = {
  image: string
  progress: number
}
