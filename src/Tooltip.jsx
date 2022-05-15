import PropTypes from 'prop-types'

import './Tooltip.css'

export function Tooltip({ title, children }) {
  return (
    <div className="Tooltip Tooltip--visible">
      {children}
      <div className="Tooltip__title" role="tooltip">
        {title}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  // The text to show in the tooltip
  title: PropTypes.string.isRequired,
  // The target element for the tooltiip
  children: PropTypes.node.isRequired,
}
