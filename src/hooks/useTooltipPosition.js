import { useCallback, useLayoutEffect, useRef, useState } from 'react'

/**
 * Custom hook to update the position of the tooltip relative to a target element
 *
 * @param {string} placement One of the placement values supported by the tooltip
 */
export function useTooltipPosition(placement) {
  const targetElRef = useRef(null)
  const tooltipElRef = useRef(null)

  const [position, setPosition] = useState(() => ({
    top: undefined,
    left: undefined,
  }))

  // Calculate tooltip position if target and tooltip element refs are set
  const updatePosition = useCallback(() => {
    if (targetElRef.current && tooltipElRef.current) {
      setPosition(
        getPosition(
          placement,
          targetElRef.current.getBoundingClientRect(),
          tooltipElRef.current.getBoundingClientRect()
        )
      )
    }
  }, [placement])

  useLayoutEffect(updatePosition, [updatePosition])

  return { targetElRef, tooltipElRef, position }
}

/**
 * Calculate tooltip position relative to target rect
 *
 * @param {string} placement One of the placement values supported by the tooltip
 * @param {DOMRect} targetRect Bounding box of the target element
 * @param {DOMRect} tooltipRect Bounding box of the tooltip element
 */
function getPosition(placement, targetRect, tooltipRect) {
  const margin = 8
  const position = {}

  switch (placement) {
    case 'left':
      position.top = targetRect.y + targetRect.height / 2 - tooltipRect.height / 2
      position.left = targetRect.x - tooltipRect.width - margin
      break
    case 'top-left':
      position.top = targetRect.y - tooltipRect.height - margin
      position.left = targetRect.x
      break
    case 'top':
      position.top = targetRect.y - tooltipRect.height - margin
      position.left = targetRect.x + targetRect.width / 2 - tooltipRect.width / 2
      break
    case 'top-right':
      position.top = targetRect.y - tooltipRect.height - margin
      position.left = targetRect.x + targetRect.width - tooltipRect.width
      break
    case 'right':
      position.top = targetRect.y + targetRect.height / 2 - tooltipRect.height / 2
      position.left = targetRect.x + targetRect.width + margin
      break
    case 'bottom-left':
      position.top = targetRect.y + targetRect.height + margin
      position.left = targetRect.x
      break
    case 'bottom':
      position.top = targetRect.y + targetRect.height + margin
      position.left = targetRect.x + targetRect.width / 2 - tooltipRect.width / 2
      break
    case 'bottom-right':
      position.top = targetRect.y + targetRect.height + margin
      position.left = targetRect.x + targetRect.width - tooltipRect.width
      break
    default:
      console.error('Unsupported tooltip placement:', placement)
  }

  return position
}
