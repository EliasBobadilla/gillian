import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'

import { Data } from '../types/ocr'
import colors from '../utils/colors'

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
      ctx.fillStyle = colors.yellow7

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
    <figure
      css={css`
        width: calc(100vw - 550px);
        height: calc(100vh - 100px);
        overflow: scroll;
        margin: 0;
        padding: 0;
      `}
    >
      <canvas
        css={css`
          width: -webkit-fill-available;
          height: auto;
        `}
        ref={canvasRef}
      ></canvas>
    </figure>
  )
}
