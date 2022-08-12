import { css } from '@emotion/react'

import { Ocr } from '../types/ocr'
import { Image } from '../types/ocr'
import { Thumb } from './thumb'

type Prop = {
  images: Image[]
  selected: Ocr
  onSelect: (id: string) => void
}

export function Preview({ images, selected, onSelect }: Prop) {
  return (
    <div css={containerStyle}>
      {images.map((img) => (
        <Thumb
          key={img.name}
          title={img.name}
          onSelect={onSelect}
          active={selected.id === img.name}
        />
      ))}
    </div>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  width: 120px;
`
