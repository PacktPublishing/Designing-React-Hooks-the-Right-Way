import React from 'react'
import { render } from '@testing-library/react'
import Avatar from './index'

const renderAvatar = props => {
  const utils = render(<Avatar {...props} />)
  return { utils }
}

describe('Avatar Component', () => {
  // TODO: need tests for Avatar
  it('should render Avatar', () => {
    const { utils } = renderAvatar({ children: 'abc' })
    expect(utils).toBeTruthy()
  })

})
