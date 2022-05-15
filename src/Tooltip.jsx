import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './Tooltip.css'
import { useTooltipPosition } from './hooks/useTooltipPosition'

export function Tooltip({ title, placement, children }) {
  const [visible, setVisible] = useState(false)

  const { targetElRef, tooltipElRef, position } = useTooltipPosition(placement)

  // Memoized callbacks to show, hide, and toggle tooltip
  const show = useCallback(() => setVisible(true), [])
  const hide = useCallback(() => setVisible(false), [])
  const toggle = useCallback(value => {
    if (value !== undefined) {
      setVisible(!!value)
    } else {
      setVisible(value => !value)
    }
  }, [])

  const additionalChildrenProps = {
    ref: targetElRef,
    onMouseOver: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  }

  const renderChildren = () => {
    // If children is a text node, warp inside a span to get a ref
    if (typeof children === 'string') {
      return <span {...additionalChildrenProps}>{children}</span>
    }

    // If children is a function, wrap inside a span to get a ref and use as a "render prop"
    if (typeof children === 'function') {
      return <span {...additionalChildrenProps}>{children({ visible, toggle })}</span>
    }

    // It's safe to assume now that children is a react element or component (?),
    // so clone it to add the additional props
    return React.cloneElement(children, additionalChildrenProps)
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
}

Tooltip.defaultProps = {
  placement: 'bottom',
}
