import { css } from '@emotion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

function ReactPortal({ children, wrapperId = 'react-portal' }) {
  const [wrapperElement, setWrapperElement] = useState(null)

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
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

export function Modal({ children, isOpen, handleClose }) {
  const nodeRef = useRef(null)
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null)
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
          background-color: rgba(246, 203, 0, 0.9);
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
            background-color: transparent;
            border-width: 0;
            padding: 0;
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
              background-color: #333;
              box-shadow: rgba(60, 60, 58, 0.9) 0px 10px 25px;
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
            width: 60%;
            height: 60%;
            background-color: #000;
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
