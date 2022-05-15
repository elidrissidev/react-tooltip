import { useCallback, useLayoutEffect, useRef, useState } from 'react'

/**
 * Custom hook to update the position of the tooltip relative to a target element
 *
 * @param {string} placement One of the placement values supported by the tooltip
 */
export function useTooltipPosition(placement) {
  const targetElRef = useRef(null)
  const [position, setPosition] = useState(() => ({
    top: undefined,
    left: undefined,
    bottom: undefined,
    right: undefined,
  }))

  const updatePosition = useCallback(() => {
    // If target element ref is set, calculate tooltip position
    if (targetElRef.current) {
      setPosition(getPosition(placement, targetElRef.current.getBoundingClientRect()))
    }
  }, [placement])

  useLayoutEffect(updatePosition, [updatePosition])

  return { targetElRef, position }
}

/**
 * Calculate tooltip position relative to target rect
 *
 * @param {string} placement One of the placement values supported by the tooltip
 * @param {DOMRect} targetRect Rect of the target element
 */
function getPosition(placement, targetRect) {
  const margin = 8
  const position = {}

  if (placement === 'bottom') {
    position.top = targetRect.y + targetRect.height + margin
    position.left = targetRect.x
  }

  return position
}
