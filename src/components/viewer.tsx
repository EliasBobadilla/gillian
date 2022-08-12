type Prop = {
  image: string
}

export function Viewer({ image }: Prop) {
  return (
    <div>
      <img src={image} alt="" />
    </div>
  )
}
