export function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const baseURL = reader.result ? reader.result?.toString() : ''
      resolve(baseURL)
    }
  })
}
