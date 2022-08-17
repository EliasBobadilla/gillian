import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

import { Data, Field } from '../types/ocr'
import { cleanOcr } from '../utils/ocr'

type Prop = {
  data: Data
  fields: Field[]
  onChange: (value: Data) => void
}

export function Validator({ data, fields }: Prop) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    let model: { [key: string]: string } = {}
    fields.forEach((field) => {
      const ocr = data.ocr?.find((x) => x.text.includes(field.anchor))
      if (ocr) model[field.name] = cleanOcr(field, ocr.text)
    })
    setFormData(model)
  }, [data, fields])

  const handleChange = (property: string, value: string) => {
    const model = { ...formData, [property]: value }
    setFormData(model)
    const newData = { ...data, ocr }
    console.log('***************>', model)
  }

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 400px;
        padding: 20px;
      `}
    >
      {fields.map((field) => (
        <label
          css={css`
            display: flex;
            flex-direction: column;
            gap: 5px;
            text-transform: uppercase;
            input {
              height: 30px;
              text-transform: uppercase;
            }
          `}
          key={field.name}
        >
          {field.label}
          <input
            type="text"
            name={formData[field.name]}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </label>
      ))}
    </form>
  )
}
