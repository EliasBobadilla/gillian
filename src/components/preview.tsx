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
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: #f6cb00;
        padding: 15px;
        height: calc(100vh - 130px);
        overflow-y: scroll;
        max-width: 100px;
      `}
    >
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
