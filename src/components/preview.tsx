import { css } from '@emotion/react'

type Prop = {
  title: string
  image: string
}

export function Preview({ title, image }: Prop) {
  return (
    <div>
      <p> {title} </p>
      <img alt={title} css={imgStyle} src={image} />
    </div>
  )
}

const imgStyle = css`
  max-height: 200px;
  width: auto;
`
