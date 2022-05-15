import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './Tooltip.css'
import { useTooltipPosition } from './hooks/useTooltipPosition'

export function Tooltip({ title, placement, children }) {
  const [visible, setVisible] = useState(false)

  const { targetElRef, tooltipElRef, position } = useTooltipPosition(placement)

  // Memoized callbacks to show and hide tooltip
  const show = useCallback(() => setVisible(true), [])
  const hide = useCallback(() => setVisible(false), [])

  const renderChildren = () => {
    return React.cloneElement(children, {
      ref: targetElRef,
      onMouseOver: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
    })
  }

  return (
    <div className={clsx('Tooltip', { 'Tooltip--visible': visible })}>
      {renderChildren()}
      <div ref={tooltipElRef} className="Tooltip__title" role="tooltip" style={{ ...position }}>
        {title}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  // The text to show in the tooltip
  title: PropTypes.string.isRequired,
  // Tooltip placement relative to the target element
  placement: PropTypes.oneOf([
    'left',
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ]),
  // The target element for the tooltiip
  children: PropTypes.node.isRequired,
}

Tooltip.defaultProps = {
  placement: 'bottom',
}
