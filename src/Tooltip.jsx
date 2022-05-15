import React from 'react'
import PropTypes from 'prop-types'

import './Tooltip.css'
import { useTooltipPosition } from './hooks/useTooltipPosition'

export function Tooltip({ title, placement, children }) {
  const { targetElRef, position } = useTooltipPosition(placement)

  const renderChildren = () => {
    return React.cloneElement(children, {
      ref: targetElRef,
    })
  }

  return (
    <div className="Tooltip Tooltip--visible">
      {renderChildren()}
      <div className="Tooltip__title" role="tooltip" style={{ ...position }}>
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
