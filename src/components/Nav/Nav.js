import React from 'react'
import {
  elementType, func, number, string, object,
  arrayOf, oneOfType, bool
} from 'prop-types'
import Button from '../Button'
import NavStyle from './NavStyle'

const Nav = ({
  Style, selected, items, onSelect,
  text,
  ...props
}) => {
  const isActive = item => item.key === selected
  const buttonProps = item => {
    const active = isActive(item)
    const disabled = item.disabled
    if (text) return { disabled, text: true, link: active }
    return { disabled, outlined: active }
  }

  return (
    <Style
      text={text}
      {...props}
    >
      {items.map(item => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          role="listitem"
          key={item.key}
          className={item.key === selected ? '__active' : ''}
        >
          <Button
            {...buttonProps(item)}
            onClick={() => { onSelect(item.key) }}
          >
            {item.label}
          </Button>
        </div>
      ))}
    </Style>
  )
}

Nav.propTypes = {
  Style: elementType,
  selected: oneOfType([string, number]),
  items: arrayOf(object),
  onSelect: func,
  outlined: bool,
  text: bool,
}

Nav.defaultProps = {
  Style: NavStyle,
  items: [],
  onSelect: () => { },
  outlined: false,
  text: false
}

export default Nav
