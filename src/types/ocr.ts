export type Field = {
  label: string
  name: string
  type: string
  anchor: string
}

export type Ocr = {
  text: string
  box: {
    x0: number
    y0: number
    x1: number
    y1: number
  }
}

export type Data = {
  id: string
  image: string
  ocr?: Ocr[]
}

export type Log = {
  id: string
  progress: number
}
