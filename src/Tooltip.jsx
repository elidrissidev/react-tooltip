import React, { useCallback, useId, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './Tooltip.css'
import { useTooltipPosition } from './hooks/useTooltipPosition'

export function Tooltip({ title, placement, manual: isManual, children }) {
  const [visible, setVisible] = useState(false)

  const { targetElRef, tooltipElRef, position } = useTooltipPosition(placement)

  const tooltipId = useId()

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

  // Event handler to hide tooltip when 'Esc' key is pressed
  const handleKeyDown = useCallback(event => {
    if (event.key === 'Escape') {
      setVisible(false)
    }
  }, [])

  const additionalChildrenProps = {
    ref: targetElRef,
    // Reference tooltip element
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tooltip_Role#associated_wai-aria_roles_states_and_properties
    'aria-describedby': `tooltip-${tooltipId}`,
    onKeyDown: handleKeyDown,
    // Don't include event handlers if tooltip is configured to be controlled manually
    ...(isManual
      ? {}
      : {
          onMouseOver: show,
          onMouseLeave: hide,
          onFocus: show,
          onBlur: hide,
        }),
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
      <div
        ref={tooltipElRef}
        id={`tooltip-${tooltipId}`}
        className="Tooltip__title"
        role="tooltip"
        style={{ ...position }}
      >
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
  // Whether to control the tooltip manually or show on hover/focus
  manual: PropTypes.bool,
  // The target element for the tooltiip
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
}

Tooltip.defaultProps = {
  placement: 'bottom',
  manual: false,
}
