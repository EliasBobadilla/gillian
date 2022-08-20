import { Data } from '../types/ocr'

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const baseURL = reader.result ? reader.result?.toString() : ''
      resolve(baseURL)
    }
  })
}

export function buildCSV(data: Data[]) {
  if (!data[0].ocr || !data[0].ocr?.length) return

  const dataTable: any[] = []
  data.forEach((row, index) => {
    if (index === 0) {
      const h = row.ocr?.map((o) => o.field.label)
      h?.push('Image name')
      const header = h?.join(',') + '\r\n'
      dataTable.push(header)
    }
    const f = row.ocr?.map((o) => o.text)
    f?.push(row.id)
    const field = f?.join(',') + '\r\n'
    dataTable.push(field)
  })

  const element = document.createElement('a')
  const file = new Blob(dataTable, { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = 'exported.csv'
  element.click()
}
