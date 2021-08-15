import React from 'react'
import {
  elementType, bool, string, oneOf
} from 'prop-types'
import ButtonStyle from './ButtonStyle'

/**
 * @memberof Button
 * @param {object} _                Props
 * @param {elementType} _.Style       Style component
 * @param {bool} _.disabled=false     In disabled state
 * @param {bool} _.outlined=false     With outlined border
 * @param {bool} _.text=false         As text
 * @param {bool} _.link=false         As text link
 * @param {string} _.size='md'        Button size, 'xs', 'sm', 'md', or 'lg'
 * @param {string} _.width='auto'     Button width
 * @param {string} _.weight='bold'    Button Weight
 */
const Button = ({ Style, children, ...props }) => (
  <Style {...props}>
    {children}
  </Style>
)

Button.propTypes = {
  Style: elementType,
  disabled: bool,
  outlined: bool,
  text: bool,
  link: bool,
  size: oneOf(['xs', 'sm', 'md', 'lg']),
  width: string,
  weight: string
}

Button.defaultProps = {
  Style: ButtonStyle,
  disabled: false,
  outlined: false,
  text: false,
  size: 'md',
  width: 'auto',
  weight: 'bold'
}

export default Button
