import { css } from '@emotion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import colors from '../utils/colors'
function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

function ReactPortal({
  children,
  wrapperId = 'react-portal',
}: {
  children: JSX.Element
  wrapperId: string
}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

type Prop = {
  children: JSX.Element
  handleClose: () => void
}
export function Modal({ children, handleClose }: Prop) {
  const nodeRef = useRef(null)
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div
        css={css`
          width: 100vw;
          height: 100vh;
          position: fixed;
          inset: 0;
          background-color: ${colors.yellow9};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-in-out;
          overflow: hidden;
          z-index: 999;
        `}
        ref={nodeRef}
      >
        <button
          css={css`
            position: absolute;
            right: 20px;
            top: 20px;
            width: 32px;
            height: 32px;
            opacity: 0.9;
            &:hover {
              opacity: 1;
              cursor: pointer;
            }
            &:before,
            &:after {
              position: absolute;
              left: 15px;
              content: '';
              height: 33px;
              width: 5px;
              background-color: ${colors.gray};
              box-shadow: ${colors.black9} 0 10px 30px;
            }
            &:before {
              transform: rotate(45deg);
            }
            &:after {
              transform: rotate(-45deg);
            }
          `}
          onClick={handleClose}
        />
        <div
          css={css`
            width: 50%;
            height: 60%;
            background-color: ${colors.black};
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {children}
        </div>
      </div>
    </ReactPortal>
  )
}
