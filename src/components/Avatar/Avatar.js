import React, { useState } from 'react'
import {
  elementType, string
} from 'prop-types'
import AvatarStyle from './AvatarStyle'

const _initials = str => {
  const p = str.split(' ').map(v => v.charAt(0))
  return p.shift() + p.pop()
}

/**
 * @memberof AvatarStyle
 * @param {object} _                Props
 * @param {elementType} _.Style       Style component
 * @param {bool} _.text=false         As text
 * @param {string} _.src              Image src
 * @param {string} _.username         Username
 */
const Avatar = ({ Style, src, username }) => {
  const [error, setError] = useState(false)
  const onError = () => { setError(true) }

  return (
    <Style>
      {error ? (
        <div>
          <span>
            {_initials(username)}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={username}
          onError={onError}
        />
      )}
    </Style>
  )
}

Avatar.propTypes = {
  Style: elementType,
  src: string,
  username: string
}

Avatar.defaultProps = {
  Style: AvatarStyle,
  src: '',
  username: ''
}

export default Avatar
