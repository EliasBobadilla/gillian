import { useState, useEffect, useRef } from "react";
import { createWorker } from "tesseract.js";
import { Preview } from "./preview";

type Result = {
  image: string;
  text: string;
};

function Reader() {
  const [images, setImages] = useState<string[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  const recognize = async (image: string) => {
    const worker = createWorker({
      logger: (m) => console.log(m), // Add logger here
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(image);

    await worker.terminate();
    return text;
  };

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || !files.length || files.length > 10 * 10) return; //TODO: enable more than 100 images

    const imgs = [...files].map((file: File) => URL.createObjectURL(file));

    setImages(imgs);
  };

  const read = async () => {
    if (!images.length) return;
    const ocr: Result[] = [];

    await Promise.all(
      images.map(async (image) => {
        const text = await recognize(image);
        ocr.push({ image, text });
      })
    );
    setResults(ocr);
  };

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  return (
    <div>
      <input type="file" onChange={upload} ref={ref} />
      <button onClick={read}>Convert to text</button>
      {images.map((img) => (
        <Preview image={img} />
      ))}
    </div>
  );
}

export default Reader;
