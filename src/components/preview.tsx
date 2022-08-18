import { css } from '@emotion/react'

import { Data } from '../types/ocr'
import colors from '../utils/colors'
import { Thumb } from './thumb'

type Prop = {
  images: Data[]
  selected: string
  onSelect: (id: number) => void
}

export function Preview({ images, selected, onSelect }: Prop) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: ${colors.yellow};
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
          position={img.index}
          onSelect={onSelect}
          active={selected === img.id}
        />
      ))}
    </div>
  )
}
