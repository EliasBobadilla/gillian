# Gillian OCR

It's a very easy and simple **OCR reader**. You can get a structured text from JPEG images, validate and correct the captured text and save it on a CSV file.

Before using it you need to set up a JSON with the fields data, for example:

```json
[
  {
    "label": "Fecha de solicitud",
    "name": "applicationDate",
    "type": "date",
    "anchor": "Solicitud"
  },
  {
    "label": "Paciente",
    "name": "patient",
    "type": "text",
    "anchor": "Paciente"
  }
]
```

- **Label**: is the name that is shown as a label in the HTML form, also is the name used as a header when you save the data.
- **Name**: is an internal name and is used for the reading process
- **Type**: is used to perform the reading and cleaner functions, currently, it supports only text and date
- **Anchor**: is the word for search on the image and capture the text next to the it

See how it works:

[![Gillian OCR](https://i.imgur.com/28KbYlt.png)](https://www.youtube.com/watch?v=4g7Q13ow1PQ)
