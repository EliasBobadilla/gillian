import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'

import { Data } from '../types/ocr'

type Prop = {
  data: Data
}

export function Viewer({ data }: Prop) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const image = new Image()

    image.onload = function () {
      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0)
      ctx.fillStyle = '#d1fe0695'

      if (data.ocr) {
        data.ocr.forEach((r) => {
          const { x0, y0, x1, y1 } = r.box
          ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
        })
      }
    }

    image.src = data.image
  }

  useEffect(() => {
    drawImage()
  }, [data])

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
