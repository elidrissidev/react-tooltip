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

  // Observe the dimensions of the document element and re-calculate tooltip position when they change
  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => updatePosition())
    observer.observe(document.documentElement)
    return () => observer.disconnect()
  }, [updatePosition])

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
  const margin = 4
  const position = {}

  switch (placement) {
    case 'left':
      position.top = -targetRect.height / 2
      position.left = -tooltipRect.width - margin
      break
    case 'top-left':
      position.top = -tooltipRect.height - margin
      position.left = 0
      break
    case 'top':
      position.top = -tooltipRect.height - margin
      position.left = targetRect.width / 2 - tooltipRect.width / 2
      break
    case 'top-right':
      position.top = -tooltipRect.height - margin
      position.left = targetRect.width - tooltipRect.width
      break
    case 'right':
      position.top = targetRect.height / 2 - tooltipRect.height / 2
      position.left = targetRect.width + margin
      break
    case 'bottom-left':
      position.top = targetRect.height + margin
      position.left = 0
      break
    case 'bottom':
      position.top = targetRect.height + margin
      position.left = targetRect.width / 2 - tooltipRect.width / 2
      break
    case 'bottom-right':
      position.top = targetRect.height + margin
      position.left = targetRect.width - tooltipRect.width
      break
    default:
      console.error('Unsupported tooltip placement:', placement)
  }

  return position
}
