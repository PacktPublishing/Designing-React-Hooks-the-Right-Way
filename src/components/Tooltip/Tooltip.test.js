import React from 'react'
import { render } from '@testing-library/react'
import Tooltip from './index'

const renderTooltip = props => {
  const utils = render(<Tooltip {...props} />)
  return { utils }
}

describe('Tooltip Component', () => {
  // TODO: need tests for Tooltip
  it('should render Tooltip', () => {
    const { utils } = renderTooltip({})
    expect(utils).toBeTruthy()
  })

})
