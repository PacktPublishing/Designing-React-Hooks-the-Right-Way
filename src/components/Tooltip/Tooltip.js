import React, { useState } from 'react'
import { node } from 'prop-types'
import TooltipStyle from './TooltipStyle'

const Tooltip = ({ text, children }) => {
  const [entered, setEntered] = useState(false)

  return (
    <TooltipStyle>
      <span
        onMouseEnter={() => { setEntered(true) }}
        onMouseLeave={() => { setEntered(true) }}
      >
        {children}
      </span>
      {entered && (
        <div className="__tooltip">
          <div className="__message">
            {text}
          </div>
        </div>
      )}
    </TooltipStyle>
  )
}

Tooltip.propTypes = {
  text: node,
}

Tooltip.defaultProps = {
  text: '',
}

export default Tooltip
