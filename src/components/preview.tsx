import { css } from '@emotion/react'

import { Data } from '../types/ocr'
import { Thumb } from './thumb'

type Prop = {
  images: Data[]
  selected: Data
  onSelect: (id: string) => void
}

export function Preview({ images, selected, onSelect }: Prop) {
  return (
    <div css={containerStyle}>
      {images.map((img) => (
        <Thumb
          key={img.id}
          title={img.id}
          onSelect={onSelect}
          active={selected.id === img.id}
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
