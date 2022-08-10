import { css } from "@emotion/react";

type Prop = {
  image: string;
  text?: string;
};

export function Preview({ image, text }: Prop) {
  return (
    <div>
      <img css={imgStyle} src={image} />
      <p> {text} </p>
    </div>
  );
}

const imgStyle = css`
  max-height: 200px;
  width: auto;
`;
