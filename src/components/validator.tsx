import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

import { Data, Field } from '../types/ocr'

type Prop = {
  data: Data
  fields: Field[]
  onChange: (value: Data) => void
}

export function Validator({ data, fields, onChange }: Prop) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const model: { [key: string]: string } = {}
    data.ocr?.forEach((ocr) => {
      if (ocr) model[ocr.field.name] = ocr.text
    })
    setFormData(model)
  }, [data])

  const handleChange = (property: string, value: string) => {
    const ocr = data.ocr?.map((ocr) => {
      if (ocr?.field.name === property) return { ...ocr, text: value }
      return ocr
    })
    onChange({ ...data, ocr })
  }

  return (
    <section>
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
    </section>
  )
}
